import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainLayout from './layouts/MainLayout';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MainLayout />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
