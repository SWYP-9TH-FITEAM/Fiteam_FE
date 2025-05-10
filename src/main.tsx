import {HeroUIProvider} from '@heroui/react';
import {createRoot} from 'react-dom/client';
import {Toaster} from 'sonner';
import App from './App.tsx';
import './index.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DevTools} from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';

const JotaiDevTools = () =>
  process.env.NODE_ENV !== 'production' ? (
    <>
      <style>{css}</style>
      <DevTools />
    </>
  ) : null;

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </QueryClientProvider>
    <Toaster richColors position="top-center" closeButton />
    <JotaiDevTools />
  </>,
);
