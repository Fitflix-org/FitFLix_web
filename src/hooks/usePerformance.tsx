import React, { useEffect, useRef, useCallback } from 'react';

interface PerformanceOptions {
  measureLCP?: boolean;
  measureCLS?: boolean;
  measureTBT?: boolean;
  optimizeImages?: boolean;
  preventLayoutShift?: boolean;
}

interface PerformanceMetrics {
  lcp?: number;
  cls?: number;
  tbt?: number;
  fcp?: number;
  fid?: number;
  ttfb?: number;
}

export const usePerformance = (options: PerformanceOptions = {}) => {
  const {
    measureLCP: enableLCP = true,
    measureCLS: enableCLS = true,
    measureTBT: enableTBT = true,
    optimizeImages = true,
    preventLayoutShift = true
  } = options;

  const metricsRef = useRef<PerformanceMetrics>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Optimize images for LCP
  const optimizeImagesForLCP = useCallback(() => {
    if (!optimizeImages) return;

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      // Set explicit dimensions to prevent layout shifts
      if (!img.width || !img.height) {
        const rect = img.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          img.width = rect.width;
          img.height = rect.height;
        }
      }

      // Optimize loading for above-the-fold images
      const rect = img.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight;
      
      if (isAboveFold) {
        img.loading = 'eager';
        img.decoding = 'sync';
        
        // Preload critical images
        if (img.src && !img.dataset.preloaded) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = img.src;
          document.head.appendChild(link);
          img.dataset.preloaded = 'true';
        }
      } else {
        img.loading = 'lazy';
        img.decoding = 'async';
      }
    });
  }, [optimizeImages]);

  // Prevent layout shifts
  const preventLayoutShifts = useCallback(() => {
    if (!preventLayoutShift) return;

    // Reserve space for dynamic content
    const dynamicContainers = document.querySelectorAll('[data-cls-reserve]');
    dynamicContainers.forEach((container) => {
      const height = container.getAttribute('data-cls-reserve');
      if (height) {
        (container as HTMLElement).style.minHeight = height;
      }
    });

    // Set explicit dimensions for images
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img) => {
      const rect = img.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        (img as HTMLImageElement).width = rect.width;
        (img as HTMLImageElement).height = rect.height;
      }
    });

    // Add CSS containment for layout stability
    const style = document.createElement('style');
    style.textContent = `
      .prevent-cls {
        contain: layout;
      }
      .image-container {
        aspect-ratio: attr(width) / attr(height);
      }
    `;
    document.head.appendChild(style);
  }, [preventLayoutShift]);

  // Monitor LCP
  const monitorLCP = useCallback(() => {
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          try {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry;
            if (lastEntry && lastEntry.startTime > 0 && !isNaN(lastEntry.startTime)) {
              metricsRef.current.lcp = lastEntry.startTime;
              console.log('LCP:', lastEntry.startTime, 'ms');
            }
          } catch (error) {
            console.warn('Error processing LCP entry:', error);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP monitoring not supported:', e);
      }
    }
  }, []);

  // Monitor CLS
  const monitorCLS = useCallback(() => {
    if ('PerformanceObserver' in window) {
      try {
        const clsObserver = new PerformanceObserver((list) => {
          try {
            const entries = list.getEntries();
            let clsValue = 0;
            entries.forEach((entry) => {
              if (entry.entryType === 'layout-shift') {
                const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
                if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
                  clsValue += layoutShiftEntry.value;
                }
              }
            });
            if (clsValue > 0 && !isNaN(clsValue)) {
              metricsRef.current.cls = clsValue;
              console.log('CLS:', clsValue);
            }
          } catch (error) {
            console.warn('Error processing CLS entry:', error);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS monitoring not supported:', e);
      }
    }
  }, []);

  // Monitor FCP
  const monitorFCP = useCallback(() => {
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          try {
            const entries = list.getEntries();
            // Filter for first-contentful-paint entry
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry && fcpEntry.startTime > 0 && !isNaN(fcpEntry.startTime)) {
              metricsRef.current.fcp = fcpEntry.startTime;
              console.log('FCP:', fcpEntry.startTime, 'ms');
            }
          } catch (error) {
            console.warn('Error processing FCP entry:', error);
          }
        });
        // Use 'paint' entry type and filter for first-contentful-paint
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP monitoring not supported:', e);
      }
    }
  }, []);

  // Monitor TTFB
  const monitorTTFB = useCallback(() => {
    if ('PerformanceObserver' in window) {
      try {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry && navigationEntry.responseStart > 0 && navigationEntry.requestStart > 0) {
          const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          if (ttfb > 0 && !isNaN(ttfb)) {
            metricsRef.current.ttfb = ttfb;
            console.log('TTFB:', ttfb, 'ms');
          }
        }
      } catch (e) {
        console.warn('TTFB monitoring not supported:', e);
      }
    }
  }, []);

  // Optimize event listeners for TBT
  const optimizeEventListeners = useCallback(() => {
    if (!enableTBT) return;

    // Use passive event listeners for scroll events
    const scrollElements = document.querySelectorAll('.scrollable, .scroll-container');
    scrollElements.forEach((element) => {
      element.addEventListener('scroll', () => {}, { passive: true });
    });

    // Debounce resize events
    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        // Handle resize logic here
      }, 100);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });

    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [enableTBT]);

  // Lazy load components
  const lazyLoadComponent = useCallback((importFunc: () => Promise<{ default: React.ComponentType }>, fallback?: React.ReactNode) => {
    const Component = React.lazy(importFunc);
    
    return (
      <React.Suspense fallback={fallback || <div>Loading...</div>}>
        <Component />
      </React.Suspense>
    );
  }, []);

  // Optimize fonts
  const optimizeFonts = useCallback(() => {
    // Preload critical fonts
    const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
    fontLinks.forEach((link) => {
      link.setAttribute('crossorigin', 'anonymous');
    });

    // Add font-display: swap
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      @font-face {
        font-family: 'Poppins';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    const observers: PerformanceObserver[] = [];
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        optimizeImagesForLCP();
        preventLayoutShifts();
        optimizeEventListeners();
        optimizeFonts();
      });
    } else {
      optimizeImagesForLCP();
      preventLayoutShifts();
      optimizeEventListeners();
      optimizeFonts();
    }

    // Start monitoring
    monitorLCP();
    monitorCLS();
    monitorFCP();
    monitorTTFB();

    // Cleanup
    return () => {
      observers.forEach(observer => {
        try {
          observer.disconnect();
        } catch (error) {
          console.warn('Error disconnecting observer:', error);
        }
      });
    };
  }, [
    optimizeImagesForLCP,
    preventLayoutShifts,
    optimizeEventListeners,
    optimizeFonts,
    monitorLCP,
    monitorCLS,
    monitorFCP,
    monitorTTFB
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup any remaining observers or event listeners
      try {
        // Remove any global event listeners
        window.removeEventListener('resize', () => {});
        window.removeEventListener('scroll', () => {});
      } catch (error) {
        console.warn('Error during cleanup:', error);
      }
    };
  }, []);

  // Return performance utilities and metrics
  return {
    metrics: metricsRef.current,
    optimizeImagesForLCP,
    preventLayoutShifts,
    lazyLoadComponent,
    optimizeFonts,
    getPerformanceReport: () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const resources = performance.getEntriesByType('resource');
      
      const totalSize = resources.reduce((acc, resource) => {
        if (resource.transferSize) {
          return acc + resource.transferSize;
        }
        return acc;
      }, 0);

      return {
        ...metricsRef.current,
        pageLoadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
        totalResourceSize: totalSize,
        resourceCount: resources.length
      };
    }
  };
};

export default usePerformance;
