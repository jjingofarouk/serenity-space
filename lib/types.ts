// lib/types.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  text: string;
  userId: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}
