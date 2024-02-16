import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../components/firebase/firebase.config";
import { signInWithPopup } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response);
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };

  const logout = async () => {
    try {
      const response = await signOut(auth);
      console.log(response);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
