// components/ChatMessage.tsx
import { Message } from '@/lib/types';
import { Card } from './ui/card';

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <Card className="bg-white p-2 mb-2">
      <p className="text-gray-700">{message.text}</p>
      <p className="text-xs text-gray-500">
        User {message.userId} • {message.createdAt.toDateString()}
      </p>
    </Card>
  );
}
