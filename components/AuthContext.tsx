// components/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (username: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  currentUser: { id: string; username: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    const loadAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');
        const username = await AsyncStorage.getItem('username');

        if (token && userId && username) {
          setIsAuthenticated(true);
          setCurrentUser({ id: userId, username: username });
        }
      } catch (error) {
        console.error('Failed to load auth status from AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthStatus();
  }, []);

  const signIn = async (username: string, token: string) => {
    setIsLoading(true);
    try {
      // Simulate API call and success
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userId', 'currentUserId'); // Dummy ID
      await AsyncStorage.setItem('username', username);
      setIsAuthenticated(true);
      setCurrentUser({ id: 'currentUserId', username: username });
    } catch (error) {
      console.error('Sign In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('username');
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error('Sign Out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, isLoading, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};