// components/Header.tsx
'use client';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { Card } from './ui/card';

export default function Header() {
  return (
    <Card className="bg-blue-50 border-blue-200 mb-6">
      <nav className="flex justify-between items-center p-4">
        <div className="space-x-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link href="/forum" className="text-blue-600 hover:underline">
            Forum
          </Link>
          <Link href="/chat" className="text-blue-600 hover:underline">
            Chat
          </Link>
        </div>
        <AuthButton />
      </nav>
    </Card>
  );
}