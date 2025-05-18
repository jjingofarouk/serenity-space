import { db } from './firebase';
import { collection, addDoc, getDocs, getDoc, doc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
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

export function getComments(postId: string, callback: (comments: Comment[]) => void) {
  const commentsQuery = query(
    collection(db, 'comments'),
    where('postId', '==', postId),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(commentsQuery, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comment));
    callback(comments);
  });
}

export async function addMessage(message: Omit<Message, 'id'>) {
  await addDoc(collection(db, 'messages'), message);
}

export async function getMessages(): Promise<Message[]> {
  const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
  const querySnapshot = await getDocs(messagesQuery);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message));
}