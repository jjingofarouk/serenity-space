// app/page.tsx
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Welcome to the Support Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            A safe space to share, connect, and support each other.
          </p>
          <div className="mt-4 space-x-4">
            <Link href="/forum" className="text-blue-600 hover:underline">
              Visit Forum
            </Link>
            <Link href="/chat" className="text-blue-600 hover:underline">
              Join Chat
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
