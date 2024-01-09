import theme from '@style/themes/default';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ThemeProvider } from 'styled-components';
import App from './App';
import Providers from './Providers';
import './i18n';

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error?.message}</pre>
      <pre style={{ color: 'red' }}>{error?.stack}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </Providers>
);

// style : https://dribbble.com/shots/20067815-VisioHR
