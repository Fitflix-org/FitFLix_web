import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
  fallback?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
  fallback
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Convert image URLs to WebP format when possible
  const getWebPSrc = (originalSrc: string): string => {
    // For Unsplash images, add WebP format
    if (originalSrc.includes('images.unsplash.com')) {
      return originalSrc.replace(/\?.*$/, '?auto=format&fit=crop&w=800&q=80&fm=webp');
    }
    
    // For Google images, try to get WebP version
    if (originalSrc.includes('lh3.googleusercontent.com')) {
      // Google images don't support WebP conversion via URL, so we'll use the original
      return originalSrc;
    }
    
    // For local images, use the original format to avoid breaking existing images
    if (originalSrc.startsWith('/') || originalSrc.startsWith('src/')) {
      return originalSrc; // Don't convert to WebP for now
    }
    
    return originalSrc;
  };

  // Generate responsive srcSet for better performance
  const getSrcSet = (originalSrc: string): string => {
    if (originalSrc.includes('images.unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=400&q=80&fm=webp 400w, ${baseUrl}?auto=format&fit=crop&w=800&q=80&fm=webp 800w, ${baseUrl}?auto=format&fit=crop&w=1200&q=80&fm=webp 1200w`;
    }
    
    if (originalSrc.includes('lh3.googleusercontent.com')) {
      // Google images have fixed sizes, so we'll use the original
      return originalSrc;
    }
    
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (fallback) {
      setIsLoaded(true);
    }
  };

  const webpSrc = getWebPSrc(src);
  const srcSet = getSrcSet(src);
  const finalSrc = hasError && fallback ? fallback : webpSrc;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !priority && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      <img
        ref={imgRef}
        src={finalSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded || priority ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={isInView && !hasError ? srcSet : undefined}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto'
        }}
      />
    </div>
  );
};

export default OptimizedImage;
