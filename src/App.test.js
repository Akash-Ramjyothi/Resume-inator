import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Mock the lazy-loaded components
jest.mock('../src/components/LandingPage', () => () => <div data-testid="landing-page">Landing Page Mock</div>);
jest.mock('../src/components/TemplateData', () => () => <div data-testid="template-data">Template Data Mock</div>);
jest.mock('../src/components/NotFound', () => () => <div data-testid="not-found">404 Not Found</div>);

// Helper function to render with router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Navigation and Routing', () => {
    test('renders landing page at root route "/"', async () => {
      renderWithRouter(<App />, { route: '/' });
      
      await waitFor(() => {
        expect(screen.getByTestId('landing-page')).toBeInTheDocument();
      });
      expect(screen.queryByTestId('template-data')).not.toBeInTheDocument();
    });

    test('renders templates page at "/templates" route', async () => {
      renderWithRouter(<App />, { route: '/templates' });
      
      await waitFor(() => {
        expect(screen.getByTestId('template-data')).toBeInTheDocument();
      });
      expect(screen.queryByTestId('landing-page')).not.toBeInTheDocument();
    });

    test('renders template details with parameter at "/templates/:id"', async () => {
      renderWithRouter(<App />, { route: '/templates/123' });
      
      await waitFor(() => {
        expect(screen.getByTestId('template-data')).toBeInTheDocument();
      });
    });

    test('redirects from "/home" to root route', async () => {
      renderWithRouter(<App />, { route: '/home' });
      
      await waitFor(() => {
        expect(screen.getByTestId('landing-page')).toBeInTheDocument();
      });
    });

    test('renders 404 page for unknown routes', async () => {
      renderWithRouter(<App />, { route: '/nonexistent-route' });
      
      await waitFor(() => {
        expect(screen.getByTestId('not-found')).toBeInTheDocument();
      });
    });
  });

  describe('User Interactions', () => {
    test('navigates to templates page when clicking navigation link', async () => {
      const user = userEvent.setup();
      renderWithRouter(<App />);
      
      // Assuming you have navigation links - adjust selector as needed
      const templatesLink = screen.getByRole('link', { name: /templates/i });
      await user.click(templatesLink);
      
      await waitFor(() => {
        expect(screen.getByTestId('template-data')).toBeInTheDocument();
      });
    });

    test('handles error boundary gracefully', () => {
      // Mock a component that throws error
      const originalError = console.error;
      console.error = jest.fn();
      
      jest.doMock('../src/components/LandingPage', () => {
        throw new Error('Component failed to load');
      });
      
      renderWithRouter(<App />);
      
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
      
      console.error = originalError;
    });
  });

  describe('Performance and Loading States', () => {
    test('shows loading spinner while lazy components load', () => {
      renderWithRouter(<App />);
      
      // Verify loading state is present
      expect(screen.getByText(/loading page/i)).toBeInTheDocument();
    });

    test('renders without crashing with error boundary', () => {
      const { container } = renderWithRouter(<App />);
      expect(container).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    test('has proper role attributes for main content', async () => {
      renderWithRouter(<App />);
      
      await waitFor(() => {
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
      });
    });

    test('error fallback has accessible button', () => {
      // Simulate error scenario
      const originalError = console.error;
      console.error = jest.fn();
      
      jest.doMock('../src/components/LandingPage', () => {
        throw new Error('Load failed');
      });
      
      renderWithRouter(<App />);
      
      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
      
      console.error = originalError;
    });
  });
});

// Additional test for scroll restoration
describe('Scroll Restoration', () => {
  test('scrolls to top on route change', async () => {
    window.scrollTo = jest.fn();
    renderWithRouter(<App />, { route: '/' });
    
    // Navigate to another route
    window.history.pushState({}, 'Templates', '/templates');
    
    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });
});
