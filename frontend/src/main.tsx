import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance monitoring in development - load asynchronously to avoid blocking
if (process.env.NODE_ENV === 'development') {
  // Delay performance monitoring to avoid blocking initial render
  setTimeout(() => {
    import('./lib/optimizations/jsOptimizer').then(({ monitorPerformance }) => {
      monitorPerformance();
    });
    
    // Core Web Vitals optimization
    import('./lib/optimizations/coreWebVitals').then(({ monitorCoreWebVitals, optimizeLCP, optimizeCLS, optimizeTBT }) => {
      monitorCoreWebVitals();
      
      // Apply optimizations after DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          optimizeLCP();
          optimizeCLS();
          optimizeTBT();
        });
      } else {
        optimizeLCP();
        optimizeCLS();
        optimizeTBT();
      }
    });

    // Initialize advanced performance monitoring
    import('./lib/optimizations/performanceService').then(({ performanceService }) => {
      // Log performance report after 10 seconds to avoid blocking
      setTimeout(() => {
        console.log(performanceService.generateReport());
      }, 10000);

      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        performanceService.cleanup();
      });
    });
  }, 1000); // Wait 1 second before loading performance tools
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
