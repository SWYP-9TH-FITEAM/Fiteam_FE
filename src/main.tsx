import {HeroUIProvider} from '@heroui/react';
import {createRoot} from 'react-dom/client';
import {Toaster} from 'sonner';
import App from './App.tsx';
import './index.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {JotaiDevTools} from './components/JotaiDevTools.tsx';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <Toaster richColors position="top-center" closeButton />
    <JotaiDevTools />
  </>,
);
