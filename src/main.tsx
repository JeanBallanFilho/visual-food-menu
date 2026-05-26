import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { GlobalToaster } from '@/components/GlobalToaster';
import { MenuPage } from '@/pages/MenuPage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { AdminPanel } from '@/pages/AdminPanel';
import './styles.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/painel" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <GlobalToaster />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
