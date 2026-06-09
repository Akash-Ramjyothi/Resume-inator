// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// expect(screen.getByRole('button')).toBeEnabled()
// expect(container.firstChild).toHaveClass('active')
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';

// Optional: Extend with custom matchers for common testing scenarios
// Uncomment and modify as needed for your project

/*
// Example: Custom matcher for checking loading states
expect.extend({
  toBeLoading(received) {
    const pass = received.hasAttribute('data-loading') && 
                 received.getAttribute('data-loading') === 'true';
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be in loading state`,
      pass,
    };
  },
});

// Example: Custom matcher for checking error messages
expect.extend({
  toHaveErrorMessage(received, expectedMessage) {
    const errorElement = received.querySelector('[role="alert"]');
    const pass = errorElement && errorElement.textContent === expectedMessage;
    return {
      message: () => `expected ${pass ? 'not ' : ''}to have error message "${expectedMessage}"`,
      pass,
    };
  },
});
*/

// Silence console errors/warnings during tests (optional)
// Useful for keeping test output clean, but use sparingly
/*
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args) => {
    if (args[0]?.includes('Warning: ReactDOM.render is no longer supported')) {
      return;
    }
    originalError.call(console, ...args);
  };
  
  console.warn = (...args) => {
    if (args[0]?.includes('deprecated')) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
*/

// Configure testing library to use custom data-testid attribute (optional)
// configure({ testIdAttribute: 'data-test-id' });
