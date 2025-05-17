// app/forum/page.tsx
'use client'; // Ensure client-side rendering
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/firestore';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Forum() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-blue-800">Forum</h1>
        <Link href="/forum/new">
          <Button className="bg-blue-600 hover:bg-blue-700">New Post</Button>
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}