import React, { useState, useEffect, useRef } from 'react';

interface AdvancedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const AdvancedImage: React.FC<AdvancedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  placeholder,
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;

    // Generate WebP URL for supported sources
    const generateWebPUrl = (originalSrc: string): string => {
      // Handle Unsplash images
      if (originalSrc.includes('unsplash.com')) {
        const baseUrl = originalSrc.split('?')[0];
        const params = new URLSearchParams(originalSrc.split('?')[1] || '');
        params.set('fm', 'webp');
        params.set('q', '85'); // Quality optimization
        return `${baseUrl}?${params.toString()}`;
      }

      // Handle local images (you can add WebP versions)
      if (originalSrc.startsWith('/') || originalSrc.startsWith('./')) {
        // For local images, you might want to serve WebP versions
        // This would require build-time conversion or server-side support
        return originalSrc;
      }

      return originalSrc;
    };

    // Generate responsive srcset for better performance
    const generateSrcSet = (originalSrc: string): string => {
      if (originalSrc.includes('unsplash.com')) {
        const baseUrl = originalSrc.split('?')[0];
        const params = new URLSearchParams(originalSrc.split('?')[1] || '');
        
        const sizes = [400, 800, 1200, 1600];
        const srcset = sizes
          .map(size => {
            params.set('w', size.toString());
            params.set('fm', 'webp');
            params.set('q', '85');
            return `${baseUrl}?${params.toString()} ${size}w`;
          })
          .join(', ');
        
        return srcset;
      }
      
      return originalSrc;
    };

    const webPUrl = generateWebPUrl(src);
    const srcSet = generateSrcSet(src);
    
    setImageSrc(webPUrl);
    
    // Set up intersection observer for lazy loading
    if (!priority && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.srcset = img.dataset.srcset || '';
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
                observer.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px', // Start loading 50px before image comes into view
          threshold: 0.01
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Show placeholder while loading
  if (!imageSrc && placeholder) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
        aria-label={alt}
      />
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div 
        className={`bg-red-100 border border-red-300 rounded flex items-center justify-center ${className}`}
        style={{ width, height }}
        aria-label={`Failed to load: ${alt}`}
      >
        <span className="text-red-500 text-sm">⚠️ Image failed to load</span>
      </div>
    );
  }

  return (
    <div className="image-container prevent-cls" style={{ width, height }}>
      <img
        ref={imgRef}
        src={priority ? imageSrc : ''}
        data-src={!priority ? imageSrc : ''}
        data-srcset={!priority ? generateSrcSet(src) : ''}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

export default AdvancedImage;
