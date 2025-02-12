import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebaseConfig';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLoggedIn(true);

        const userToken = await getIdToken(user);
        setToken(userToken);
        localStorage.setItem('token', userToken);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setToken(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, token, userLoggedIn, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
