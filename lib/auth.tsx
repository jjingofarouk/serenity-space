'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, signInAnonymously as firebaseSignInAnonymously } from 'firebase/auth';
import { firebaseApp } from './firebase'; // adjust if needed

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

// ✅ Export useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// ✅ Export signInAnonymously function
export const signInAnonymously = async () => {
  const auth = getAuth(firebaseApp);
  await firebaseSignInAnonymously(auth);
};
