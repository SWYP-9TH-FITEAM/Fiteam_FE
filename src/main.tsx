import {HeroUIProvider} from '@heroui/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {createRoot} from 'react-dom/client';
import {Toaster} from 'sonner';

import App from './App';
import {JotaiDevTools} from './components/JotaiDevTools';

import './index.css';

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
