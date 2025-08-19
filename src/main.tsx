import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/jsOptimizer').then(({ monitorPerformance }) => {
    monitorPerformance();
  });
  
  // Core Web Vitals optimization
  import('./utils/coreWebVitals').then(({ monitorCoreWebVitals, optimizeLCP, optimizeCLS, optimizeTBT }) => {
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
  import('./services/performanceService').then(({ performanceService }) => {
    // Log performance report after 5 seconds
    setTimeout(() => {
      console.log(performanceService.generateReport());
    }, 5000);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      performanceService.cleanup();
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
