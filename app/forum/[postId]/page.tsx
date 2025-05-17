// app/forum/[postId]/page.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/lib/firestore';
import CommentSection from '@/components/CommentSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function PostPage({ params }: { params: { postId: string } }) {
  const [displayName, setDisplayName] = useState('Unknown User');
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => getPost(params.postId),
  });

  useEffect(() => {
    if (post) {
      const fetchDisplayName = async () => {
        const userRef = doc(db, 'users', post.userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().displayName || 'Unknown User');
        }
      };
      fetchDisplayName();
    }
  }, [post]);

  if (isLoading) {
    return (
      <p className="text-gray-700 text-lg text-center max-w-4xl mx-auto">
        Loading...
      </p>
    );
  }
  if (!post) {
    return (
      <p className="text-gray-700 text-lg text-center max-w-4xl mx-auto">
        Post not found.
      </p>
    );
  }

  const createdAt = post.createdAt instanceof Timestamp
    ? format(post.createdAt.toDate(), 'MMM d, yyyy')
    : format(new Date(post.createdAt), 'MMM d, yyyy');

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
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
          <p className="text-sm text-gray-500">
            Posted by {displayName} on {createdAt}
          </p>
          <CommentSection postId={params.postId} />
        </CardContent>
      </Card>
    </motion.div>
  );
}