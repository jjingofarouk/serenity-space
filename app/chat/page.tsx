// app/chat/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { addMessage, getMessages } from '@/lib/firestore';
import ChatMessage from '@/components/ChatMessage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;
    await addMessage({
      text: newMessage,
      userId: user.uid,
      createdAt: new Date(),
    });
    setNewMessage('');
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Community Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 overflow-y-auto mb-4 p-4 bg-white rounded">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
        {user ? (
          <form onSubmit={handleSend} className="flex space-x-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Send
            </Button>
          </form>
        ) : (
          <p className="text-gray-700">Please sign in to chat.</p>
        )}
      </CardContent>
    </Card>
  );
}
