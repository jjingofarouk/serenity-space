// app/chat/page.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth';
import { addMessage } from '@/lib/firestore';
import ChatMessage from '@/components/ChatMessage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Real-time message subscription
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

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;
    try {
      await addMessage({
        text: newMessage,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-none shadow-xl rounded-2xl max-w-4xl mx-auto">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-2xl font-semibold text-blue-800 tracking-tight">
          Community Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div
          className="h-[60vh] max-h-[600px] overflow-y-auto mb-6 p-4 bg-white rounded-xl shadow-inner"
          role="log"
          aria-live="polite"
        >
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage message={msg} currentUserId={user?.uid} />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        {user ? (
          <form onSubmit={handleSend} className="flex gap-3">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow resize-none rounded-xl border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500 text-gray-800"
              rows={3}
              aria-label="Message input"
            />
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl px-6 transition-all duration-200 ease-in-out transform hover:scale-105"
              disabled={!newMessage.trim()}
              aria-label="Send message"
            >
              Send
            </Button>
          </form>
        ) : (
          <p className="text-gray-700 text-center text-base">
            Please{' '}
            <a href="/login" className="text-teal-600 hover:underline font-medium">
              sign in
            </a>{' '}
            to join the conversation.
          </p>
        )}
      </CardContent>
    </Card>
  );
}