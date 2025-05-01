import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {HeroUIProvider} from '@heroui/react';
import {Toaster} from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
    <Toaster richColors position="top-center" closeButton />
  </StrictMode>,
);
