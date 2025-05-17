// app/forum/new/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPost } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Please sign in.');
    await addPost({ title, content, userId: user.uid, createdAt: new Date() });
    router.push('/forum');
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full"
            required
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
