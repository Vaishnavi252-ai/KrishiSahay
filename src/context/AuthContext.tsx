import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string, language: 'en' | 'hi' | 'mr') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // For testing: force clear previous user session on reload
    localStorage.removeItem('agricredit_user');

    // Then check if any session is still there
    const storedUser = localStorage.getItem('agricredit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('agricredit_users') || '[]');
      const foundUser = users.find((u: User) =>
        (u.email === email || u.phone === email) && u.password === password
      );
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('agricredit_user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    language: 'en' | 'hi' | 'mr'
  ): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('agricredit_users') || '[]');
      const existingUser = users.find((u: User) => u.email === email || u.phone === phone);
      if (existingUser) {
        return false;
      }
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password,
        language,
        isVerified: false
      };
      users.push(newUser);
      localStorage.setItem('agricredit_users', JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem('agricredit_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agricredit_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('agricredit_user', JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem('agricredit_users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('agricredit_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
