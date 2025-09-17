// Performance test for hybrid caching implementation
// Run this in browser console when viewing the Events page

console.log('🚀 FitFlix Hybrid Caching Performance Test');
console.log('=' .repeat(50));

// Test 1: Check if React Query is working
const testReactQuery = () => {
  console.log('\n📊 Testing React Query Integration...');
  
  // Check if React Query DevTools are available
  if (window.__REACT_QUERY_DEVTOOLS__) {
    console.log('✅ React Query DevTools detected');
  } else {
    console.log('ℹ️  React Query DevTools not available (normal in production)');
  }
  
  // Check for React Query client
  const queryClient = window.__REACT_QUERY_CLIENT__;
  if (queryClient) {
    console.log('✅ React Query Client accessible');
    const cache = queryClient.getQueryCache();
    console.log(`📦 Cache size: ${cache.getAll().length} queries`);
    
    // Log cached queries
    cache.getAll().forEach(query => {
      console.log(`   - ${JSON.stringify(query.queryKey)}: ${query.state.status}`);
    });
  }
};

// Test 2: Monitor network requests
const monitorNetworkRequests = () => {
  console.log('\n🌐 Monitoring Network Requests...');
  
  let requestCount = 0;
  const originalFetch = window.fetch;
  
  window.fetch = function(...args) {
    requestCount++;
    console.log(`📡 Request #${requestCount}: ${args[0]}`);
    return originalFetch.apply(this, args);
  };
  
  setTimeout(() => {
    console.log(`\n📈 Total API requests in 30 seconds: ${requestCount}`);
    window.fetch = originalFetch; // Restore original fetch
  }, 30000);
};

// Test 3: Cache performance metrics
const measureCachePerformance = () => {
  console.log('\n⚡ Testing Cache Performance...');
  
  const startTime = performance.now();
  
  // Simulate multiple component renders accessing events data
  for (let i = 0; i < 100; i++) {
    const cachedData = sessionStorage.getItem('events-cache');
    if (cachedData) {
      JSON.parse(cachedData);
    }
  }
  
  const endTime = performance.now();
  console.log(`💨 100 cache reads took: ${(endTime - startTime).toFixed(2)}ms`);
};

// Test 4: Offline behavior simulation
const testOfflineBehavior = () => {
  console.log('\n📴 Testing Offline Behavior...');
  console.log('To test offline behavior:');
  console.log('1. Open Network tab in DevTools');
  console.log('2. Set throttling to "Offline"');
  console.log('3. Refresh the page');
  console.log('4. Check if cached events still display');
  console.log('5. Watch for offline indicator in UI');
};

// Test 5: Background revalidation
const testBackgroundRevalidation = () => {
  console.log('\n🔄 Testing Background Revalidation...');
  console.log('Background revalidation happens every 5 minutes.');
  console.log('To test:');
  console.log('1. Keep this page open for 5+ minutes');
  console.log('2. Watch Network tab for automatic refetch');
  console.log('3. Check if UI updates with fresh data');
};

// Test 6: Hover prefetching
const testHoverPrefetching = () => {
  console.log('\n👆 Testing Hover Prefetching...');
  console.log('To test hover prefetching:');
  console.log('1. Hover over event cards');
  console.log('2. Watch Network tab for prefetch requests');
  console.log('3. Click on event to see instant loading');
};

// Run all tests
const runAllTests = () => {
  testReactQuery();
  measureCachePerformance();
  monitorNetworkRequests();
  testOfflineBehavior();
  testBackgroundRevalidation();
  testHoverPrefetching();
  
  console.log('\n🎯 Performance Tips:');
  console.log('- First load should cache events for 5 minutes');
  console.log('- Subsequent renders should be instant (cached)');
  console.log('- Background updates every 5 minutes');
  console.log('- Hover prefetching reduces click-to-load time');
  console.log('- Offline mode shows cached data + offline indicator');
};

// Auto-run tests
runAllTests();

// Export test functions for manual testing
window.fitflixCacheTests = {
  testReactQuery,
  monitorNetworkRequests,
  measureCachePerformance,
  testOfflineBehavior,
  testBackgroundRevalidation,
  testHoverPrefetching,
  runAllTests
};

console.log('\n🛠️  Available test functions in window.fitflixCacheTests');