// components/AuthButton.tsx
'use client';
import { useAuth } from '@/lib/auth';
import { signInWithGoogle, signInAnonymously, signOutUser } from '@/lib/auth';
import { Button } from './ui/button';

export default function AuthButton() {
  const { user } = useAuth();

  return user ? (
    <Button onClick={signOutUser} className="bg-gray-500 hover:bg-gray-600">
      Sign Out
    </Button>
  ) : (
    <div className="space-x-2">
      <Button onClick={signInWithGoogle} className="bg-blue-600 hover:bg-blue-700">
        Sign In with Google
      </Button>
      <Button onClick={signInAnonymously} className="bg-gray-500 hover:bg-gray-600">
        Sign In Anonymously
      </Button>
    </div>
  );
}
