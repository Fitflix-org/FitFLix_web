import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const useScrollRestoration = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef<Record<string, number>>({});
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Store current scroll position before navigation
    const currentPath = location.pathname;
    scrollPositions.current[currentPath] = window.scrollY;

    // Handle different navigation types
    if (navigationType === 'PUSH') {
      // New page - scroll to top
      window.scrollTo(0, 0);
    } else if (navigationType === 'POP') {
      // Back navigation - restore scroll position
      const savedPosition = scrollPositions.current[currentPath];
      if (savedPosition !== undefined) {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
          window.scrollTo(0, savedPosition);
        }, 0);
      } else {
        // No saved position, scroll to top
        window.scrollTo(0, 0);
      }
    } else if (navigationType === 'REPLACE') {
      // Replace navigation - scroll to top
      window.scrollTo(0, 0);
    }

    // Handle initial page load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigationType]);

  // Save scroll position on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentPath = location.pathname;
      scrollPositions.current[currentPath] = window.scrollY;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname]);

  // Save scroll position on scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentPath = location.pathname;
      scrollPositions.current[currentPath] = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
};
