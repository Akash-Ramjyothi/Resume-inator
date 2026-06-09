// Web Vitals reporting utility for measuring real-world performance metrics
// Tracks: CLS (Cumulative Layout Shift), FID (First Input Delay), 
// FCP (First Contentful Paint), LCP (Largest Contentful Paint), 
// TTFB (Time to First Byte)

const reportWebVitals = (onPerfEntry, options = {}) => {
  const { 
    debounce = false, 
    sampleRate = 1.0,
    reportAllChanges = false,
    logToConsole = process.env.NODE_ENV === 'development'
  } = options;

  // Sample rate: only report for a percentage of users (0.0 to 1.0)
  if (sampleRate < 1.0 && Math.random() > sampleRate) {
    return;
  }

  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ 
      getCLS, getFID, getFCP, getLCP, getTTFB, onLCP, onFID, onCLS 
    }) => {
      // Use appropriate function based on web-vitals version
      const report = (metric) => {
        // Add timestamp for when metric was captured
        const enhancedMetric = {
          ...metric,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          connection: navigator.connection?.effectiveType || 'unknown'
        };

        // Console logging for development
        if (logToConsole) {
          console.log(`[Web Vitals] ${metric.name}:`, metric.value, enhancedMetric);
        }

        // Debounce if enabled (for analytics batching)
        if (debounce) {
          debouncedReport(onPerfEntry, enhancedMetric);
        } else {
          onPerfEntry(enhancedMetric);
        }
      };

      // Report metrics with optional configuration
      const reportOptions = { reportAllChanges };
      
      getCLS(report, reportOptions);
      getFID(report, reportOptions);
      getFCP(report, reportOptions);
      getLCP(report, reportOptions);
      getTTFB(report, reportOptions);

      // Additional modern metrics (if needed)
      // onLCP(report);
      // onFID(report);
      // onCLS(report);
    }).catch(error => {
      console.error('[Web Vitals] Failed to load web-vitals module:', error);
    });
  }
};

// Debounce utility to prevent overwhelming analytics endpoints
let debounceTimer;
const debouncedReport = (callback, metric, delay = 1000) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    callback(metric);
  }, delay);
};

// Optional: Report to Google Analytics
export const reportToAnalytics = (metric) => {
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      metric_navigationType: metric.navigationType,
    });
  }
};

// Optional: Report to Sentry
export const reportToSentry = (metric) => {
  if (window.Sentry) {
    window.Sentry.addBreadcrumb({
      category: 'web-vitals',
      message: `${metric.name}: ${metric.value}`,
      level: metric.rating === 'poor' ? 'warning' : 'info',
      data: metric
    });
  }
};

// Optional: Send to custom API endpoint
export const reportToAPI = async (metric, endpoint = '/api/metrics') => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
      // Keep alive for analytics
      keepalive: true,
    });
    
    if (!response.ok) {
      console.warn(`[Web Vitals] Failed to report to API: ${response.status}`);
    }
  } catch (error) {
    console.error('[Web Vitals] Error reporting to API:', error);
  }
};

// Utility to get performance scores
export const getPerformanceScore = (metrics) => {
  let score = 100;
  
  if (metrics.LCP && metrics.LCP.value > 2500) score -= 20;
  if (metrics.FID && metrics.FID.value > 100) score -= 20;
  if (metrics.CLS && metrics.CLS.value > 0.1) score -= 20;
  
  return Math.max(0, score);
};

// Export both default and named functions
export default reportWebVitals;

// Optional: Auto-initialize with default reporters
export const initWebVitals = (options = {}) => {
  const {
    analytics = false,
    sentry = false,
    api = false,
    apiEndpoint = '/api/metrics',
    ...reportOptions
  } = options;

  const reporters = [];
  
  if (analytics) reporters.push(reportToAnalytics);
  if (sentry) reporters.push(reportToSentry);
  if (api) reporters.push((metric) => reportToAPI(metric, apiEndpoint));
  
  const reportAll = (metric) => {
    reporters.forEach(reporter => reporter(metric));
  };
  
  if (reporters.length > 0) {
    reportWebVitals(reportAll, reportOptions);
  }
  
  return { reportWebVitals: (callback) => reportWebVitals(callback, reportOptions) };
};
