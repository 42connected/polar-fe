import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import defaultTheme from '../../styles/theme';
import { ThemeProvider } from 'styled-components';

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function Providers({ children }: Props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <Router basename="/">{children}</Router>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default Providers;
