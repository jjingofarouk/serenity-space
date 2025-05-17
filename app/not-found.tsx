// app/not-found.tsx
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Page Not Found</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Sorry, the page you’re looking for doesn’t exist.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </CardContent>
    </Card>
  );
}