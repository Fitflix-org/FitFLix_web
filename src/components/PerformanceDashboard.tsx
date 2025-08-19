import React, { useState, useEffect } from 'react';
import { usePerformance } from '../hooks/usePerformance';

interface PerformanceData {
  lcp?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  pageLoadTime?: number;
  totalResourceSize?: number;
  resourceCount?: number;
}

const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceData>({});
  const [isVisible, setIsVisible] = useState(false);
  const { getPerformanceReport } = usePerformance();

  useEffect(() => {
    // Update metrics every 2 seconds
    const interval = setInterval(() => {
      const report = getPerformanceReport();
      setMetrics(report);
    }, 2000);

    return () => clearInterval(interval);
  }, [getPerformanceReport]);

  const getScoreColor = (value: number, target: number, metric: string) => {
    if (metric === 'cls') {
      // CLS is lower = better
      return value <= target * 0.5 ? 'text-green-500' : 
             value <= target ? 'text-yellow-500' : 'text-red-500';
    } else {
      // Other metrics are lower = better
      return value <= target * 0.8 ? 'text-green-500' : 
             value <= target ? 'text-yellow-500' : 'text-red-500';
    }
  };

  const getScoreIcon = (value: number, target: number, metric: string) => {
    if (metric === 'cls') {
      return value <= target * 0.5 ? '🟢' : 
             value <= target ? '🟡' : '🔴';
    } else {
      return value <= target * 0.8 ? '🟢' : 
             value <= target ? '🟡' : '🔴';
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Show Performance Dashboard"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Performance Dashboard</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {/* LCP */}
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm font-medium">LCP</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold ${getScoreColor(metrics.lcp || 0, 2500, 'lcp')}`}>
              {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'N/A'}
            </span>
            <span className="text-xs text-gray-500">Target: 2500ms</span>
            <span className="text-lg">{getScoreIcon(metrics.lcp || 0, 2500, 'lcp')}</span>
          </div>
        </div>

        {/* CLS */}
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm font-medium">CLS</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold ${getScoreColor(metrics.cls || 0, 0.1, 'cls')}`}>
              {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
            </span>
            <span className="text-xs text-gray-500">Target: 0.1</span>
            <span className="text-lg">{getScoreIcon(metrics.cls || 0, 0.1, 'cls')}</span>
          </div>
        </div>

        {/* FCP */}
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm font-medium">FCP</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold ${getScoreColor(metrics.fcp || 0, 1800, 'fcp')}`}>
              {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'N/A'}
            </span>
            <span className="text-xs text-gray-500">Target: 1800ms</span>
            <span className="text-lg">{getScoreIcon(metrics.fcp || 0, 1800, 'fcp')}</span>
          </div>
        </div>

        {/* TTFB */}
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm font-medium">TTFB</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-bold ${getScoreColor(metrics.ttfb || 0, 800, 'ttfb')}`}>
              {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'N/A'}
            </span>
            <span className="text-xs text-gray-500">Target: 800ms</span>
            <span className="text-lg">{getScoreIcon(metrics.ttfb || 0, 800, 'ttfb')}</span>
          </div>
        </div>

        {/* Page Load Time */}
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm font-medium">Page Load</span>
          <span className="text-sm font-bold text-gray-700">
            {metrics.pageLoadTime ? `${metrics.pageLoadTime.toFixed(0)}ms` : 'N/A'}
          </span>
        </div>

        {/* Resource Info */}
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm font-medium">Resources</span>
          <span className="text-sm font-bold text-gray-700">
            {metrics.resourceCount || 0} files
          </span>
        </div>

        {/* Total Size */}
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-sm font-medium">Total Size</span>
          <span className="text-sm font-bold text-gray-700">
            {metrics.totalResourceSize ? `${(metrics.totalResourceSize / 1024 / 1024).toFixed(2)} MB` : 'N/A'}
          </span>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Performance Tips</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          {metrics.lcp && metrics.lcp > 2500 && (
            <li>• Optimize images and critical resources for better LCP</li>
          )}
          {metrics.cls && metrics.cls > 0.1 && (
            <li>• Fix layout shifts by setting explicit dimensions</li>
          )}
          {metrics.ttfb && metrics.ttfb > 800 && (
            <li>• Improve server response time for better TTFB</li>
          )}
          {(!metrics.lcp || metrics.lcp <= 2500) && 
           (!metrics.cls || metrics.cls <= 0.1) && 
           (!metrics.ttfb || metrics.ttfb <= 800) && (
            <li>• Great job! All metrics are within target ranges</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
