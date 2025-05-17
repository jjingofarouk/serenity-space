
// components/ClientLayout.tsx
'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth';
import Header from '@/components/Header';

const queryClient = new QueryClient();

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <main className="container mx-auto p-4">{children}</main>
      </AuthProvider>
    </QueryClientProvider>
  );
}
