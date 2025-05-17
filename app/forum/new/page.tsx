// app/forum/new/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPost } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in.');
      return;
    }
    try {
      await addPost({ title, content, userId: user.uid, createdAt: new Date() });
      router.push('/forum');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl rounded-2xl">
        <CardHeader className="border-b border-gray-200 pb-4">
          <CardTitle className="text-3xl font-semibold text-blue-800 tracking-tight">
            Create a Post
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full p-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500 text-gray-800 text-base"
              required
              aria-label="Post title"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full resize-none rounded-xl border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500 text-gray-800 text-base"
              rows={6}
              required
              aria-label="Post content"
            />
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl px-6 transition-all duration-200 ease-in-out transform hover:scale-105"
              disabled={!title.trim() || !content.trim()}
              aria-label="Submit post"
            >
              Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}