// components/ClientLayout.tsx
'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './ClientLayout.module.css';

const queryClient = new QueryClient();

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className={styles.container}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}