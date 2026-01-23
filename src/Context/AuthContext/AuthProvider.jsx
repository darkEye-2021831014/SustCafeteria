import React, { useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.init';

const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const signInWithGoogle=()=>{
    setLoading(true);
    return signInWithPopup(auth,provider);
  }
  useEffect(() => {
    // set the observer
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('current user in auth state change', currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    // clear the observer on unmount
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
