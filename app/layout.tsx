// app/layout.tsx
import { ReactNode } from 'react';
import styles from './styles/layout.module.css';
import ClientLayout from '@/components/ClientLayout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}