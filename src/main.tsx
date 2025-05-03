import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import { ConnectsProvider } from './context/ConnectsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConnectsProvider>
          <App />
          <Toaster position="top-right" />
        </ConnectsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);