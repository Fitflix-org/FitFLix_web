import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    // Ensure environment variables are available
    'process.env': {}
  },
  build: {
    // Optimized for production
    target: 'es2020',
    minify: 'terser',
    sourcemap: mode === 'development',
    outDir: 'dist',
    assetsDir: 'assets',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-accordion', '@radix-ui/react-select'],
          icons: ['lucide-react'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name || '')) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    reportCompressedSize: true,
  },
  plugins: [
    react({
      // Configure SWC properly for production
      plugins: [],
    }),
    mode === 'development' && componentTagger(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'media/fitflix-icon.png',
        'placeholder.svg',
        'robots.txt',
        'assets/*.jpg',
        '_redirects',
      ],
      manifest: {
        name: 'Fitflix - Complete Fitness Ecosystem',
        short_name: 'Fitflix',
        description: 'Your comprehensive fitness ecosystem - gyms, apps, nutrition, and community.',
        theme_color: '#f97316',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
                 icons: [
           {
             src: '/media/fitflix-icon.png',
             sizes: '48x48',
             type: 'image/png'
           },
           {
             src: '/media/fitflix-icon.png',
             sizes: '192x192',
             type: 'image/png'
           },
           {
             src: '/media/fitflix-icon.png',
             sizes: '512x512',
             type: 'image/png'
           }
         ]
      },
      devOptions: {
        enabled: false // Disable in dev to prevent conflicts
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [
          /^\/$/, 
          /^\/about$/, 
          /^\/blogs$/, 
          /^\/blogs\/.*$/, 
          /^\/discover-gym$/, 
          /^\/gym\/.*$/, 
          /^\/services$/, 
          /^\/contact$/
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
