// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-amber-50 text-gray-800 min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
