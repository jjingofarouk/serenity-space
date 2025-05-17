// app/layout.tsx
import { ReactNode } from 'react';
import Header from '@/components/Header';
import { AuthProvider } from '@/lib/auth';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <AuthProvider>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
