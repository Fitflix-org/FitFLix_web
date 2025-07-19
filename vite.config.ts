import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa'; // Import VitePWA

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add the allowedHosts array here
    allowedHosts: [
      'fitflix-website-h7fd.onrender.com',
      'localhost', // Often good to include localhost
      '127.0.0.1', // And the loopback address
    ],
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // Add VitePWA plugin here
    VitePWA({
      registerType: 'autoUpdate', // Automatically update service worker when new version is detected
      includeAssets: [
        'favicon.ico',
        'placeholder.svg',
        'robots.txt',
        'assets/*.jpg', // Include your hero-fitness.jpg and any other images in assets
        // If you have a separate folder for PWA icons (e.g., public/icons), include them here:
        // 'icons/*.png',
        // 'icons/*.svg'
      ],
      manifest: {
        name: 'Wellspring Web Hub', // Your application's full name
        short_name: 'Wellspring',    // Short name for home screen icon
        description: 'Your comprehensive fitness and wellness hub.', // Description
        theme_color: '#007bff',    // Primary color for browser UI
        background_color: '#ffffff', // Background color for splash screen
        display: 'standalone',       // Display as a standalone app
        start_url: '/',              // Starting URL when launched from home screen
        icons: [
          {
            src: '/favicon.ico', // Reference to your favicon
            sizes: '48x48',
            type: 'image/x-icon'
          },
          {
            src: '/placeholder.svg', // Reference to your placeholder.svg (consider replacing with a proper app icon)
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/placeholder.svg', // Consider a dedicated 512x512 PNG icon
            sizes: '512x512',
            type: 'image/svg+xml'
          }
          // **IMPORTANT:** It is highly recommended to create dedicated PNG icons for various sizes.
          // For example, if you have `public/icons/icon-192x192.png`, `public/icons/icon-512x512.png`:
          // {
          //    src: '/icons/icon-192x192.png',
          //    sizes: '192x192',
          //    type: 'image/png'
          // },
          // {
          //    src: '/icons/icon-512x512.png',
          //    sizes: '512x512',
          //    type: 'image/png',
          //    purpose: 'any maskable' // 'maskable' for adaptive icons on Android
          // }
        ]
      },
      devOptions: {
        enabled: true // Enable PWA features in development for easier testing
      },
      workbox: {
        // Optional: Configure Workbox (the library VitePWA uses)
        // This is where you'd add custom caching strategies, e.g., for API calls.
        // Example for caching API calls (replace with your actual API base URL):
        // runtimeCaching: [
        //    {
        //      urlPattern: ({ url }) => url.origin === 'https://your-api.com', // Replace with your backend API URL
        //      handler: 'StaleWhileRevalidate', // Serve from cache first, then update in background
        //      options: {
        //        cacheName: 'api-data-cache',
        //        expiration: {
        //          maxEntries: 50,
        //          maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 1 week
        //        },
        //        cacheableResponse: {
        //          statuses: [0, 200], // Cache opaque responses (status 0) and successful ones
        //        },
        //      },
        //    },
        // ],
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
