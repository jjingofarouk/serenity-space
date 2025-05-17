// lib/auth.ts
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously, signOut } from 'firebase/auth';

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function signInAnonymouslyUser() {
  await signInAnonymously(auth);
}

export async function signOutUser() {
  await signOut(auth);
}