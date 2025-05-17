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
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-blue-100">
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
            {children}
          </main>
          <footer className="bg-white/80 backdrop-blur-md py-4 text-center text-gray-600 text-sm font-sans">
            <p>&copy; {new Date().getFullYear()} SerenitySpace. All rights reserved.</p>
          </footer>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}