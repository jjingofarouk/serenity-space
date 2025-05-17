// app/forum/[postId]/page.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/lib/firestore';
import CommentSection from '@/components/CommentSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PostPage({ params }: { params: { postId: string } }) {
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => getPost(params.postId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{post.content}</p>
        <p className="text-sm text-gray-500 mt-2">
          Posted by User {post.userId} on {post.createdAt.toDateString()}
        </p>
        <CommentSection postId={params.postId} />
      </CardContent>
    </Card>
  );
}
