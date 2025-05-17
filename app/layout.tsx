// app/layout.tsx
import { ThemeProvider } from '@/lib/ThemeContext';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SerenitySpace',
  description: 'A supportive community for mental health',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayout>

            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}