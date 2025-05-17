// components/CommentSection.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { addComment } from '@/lib/firestore';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export default function CommentSection({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    await addComment({ postId, text: comment, userId: user.uid, createdAt: new Date() });
    setComment('');
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-blue-800">Comments</h3>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Comment
          </Button>
        </form>
      ) : (
        <p className="text-gray-700">Sign in to comment.</p>
      )}
    </div>
  );
}
