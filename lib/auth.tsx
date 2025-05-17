// lib/auth.tsx
'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, signInAnonymously as firebaseSignInAnonymously, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { firebaseApp } from './firebase';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const signInAnonymously = async () => {
  const auth = getAuth(firebaseApp);
  await firebaseSignInAnonymously(auth);
};

export const signInWithGoogle = async () => {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const signOutUser = async () => {
  const auth = getAuth(firebaseApp);
  await signOut(auth);
};