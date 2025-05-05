import {HeroUIProvider} from '@heroui/react';
import {createRoot} from 'react-dom/client';
import {Toaster} from 'sonner';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
    <Toaster richColors position="top-center" closeButton />
  </>,
);
