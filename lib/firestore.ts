// lib/firestore.ts
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  where,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { Post, Message, Comment } from './types';

export async function addPost(post: Omit<Post, 'id'>) {
  await addDoc(collection(db, 'posts'), post);
}

export async function getPosts(): Promise<Post[]> {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
}

export async function getPost(id: string): Promise<Post | null> {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Post : null;
}

export async function addComment(comment: Omit<Comment, 'id'>) {
  await addDoc(collection(db, 'comments'), comment);
}

export function getComments(postId: string, callback: (comments: Comment[], error?: string) => void) {
  const commentsQuery = query(
    collection(db, 'comments'),
    where('postId', '==', postId),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(
    commentsQuery,
    (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comment));
      console.log('getComments - Fetched comments:', comments);
      callback(comments);
    },
    (err) => {
      console.error('getComments - Snapshot error:', err);
      callback([], err.message);
    }
  );
}

export async function addMessage(message: Omit<Message, 'id'>) {
  await addDoc(collection(db, 'messages'), message);
}

export async function getMessages(): Promise<Message[]> {
  const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
  const querySnapshot = await getDocs(messagesQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message));
}

export async function addReaction(postId: string, userId: string, reactionType: 'love' | 'like' | 'support') {
  const reactionRef = doc(db, 'posts', postId, 'reactions', userId);
  await setDoc(reactionRef, { reactionType, createdAt: new Date() });
}

export async function removeReaction(postId: string, userId: string) {
  const reactionRef = doc(db, 'posts', postId, 'reactions', userId);
  await deleteDoc(reactionRef);
}

export async function getReactions(postId: string, userId?: string): Promise<{
  love: number;
  like: number;
  support: number;
  userReaction?: 'love' | 'like' | 'support';
}> {
  const reactionsQuery = query(collection(db, 'posts', postId, 'reactions'));
  const snapshot = await getDocs(reactionsQuery);
  const reactions = snapshot.docs.map((doc) => doc.data().reactionType as 'love' | 'like' | 'support');
  return {
    love: reactions.filter((r) => r === 'love').length,
    like: reactions.filter((r) => r === 'like').length,
    support: reactions.filter((r) => r === 'support').length,
    userReaction: userId ? snapshot.docs.find((doc) => doc.id === userId)?.data().reactionType : undefined,
  };
}