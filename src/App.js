import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load components for better performance
const LandingPage = lazy(() => import('../src/components/LandingPage'));
const TemplateData = lazy(() => import('../src/components/TemplateData'));
const NotFound = lazy(() => import('../src/components/NotFound'));
const LoadingSpinner = lazy(() => import('../src/components/LoadingSpinner'));

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="error-container">
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

// Loading component
const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner />
    <p>Loading page...</p>
  </div>
);

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route 
              exact 
              path="/" 
              component={LandingPage}
            />
            <Route 
              exact 
              path="/templates" 
              component={TemplateData}
            />
            {/* Add routes for template details with param */}
            <Route 
              exact 
              path="/templates/:id" 
              render={(props) => <TemplateData {...props} />}
            />
            {/* Redirect old routes if needed */}
            <Redirect from="/home" to="/" />
            {/* 404 page - must be last */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
