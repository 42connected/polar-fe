import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import defaultThemeV1 from '@/styles/theme';
import defaultThemeV2 from '@/styles/themeV2';
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
        <ThemeProvider theme={defaultThemeV1}>
          <ThemeProvider theme={defaultThemeV2}>
            <Router basename="/">{children}</Router>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default Providers;
