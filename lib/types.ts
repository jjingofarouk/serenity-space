// lib/types.ts
import { Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Timestamp | Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Timestamp | Date;
}

export interface Comment {
  id: string;
  postId: string;
  text: string;
  userId: string;
  createdAt: Timestamp | Date;
}