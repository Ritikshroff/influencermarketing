import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/index';
import { dummyInfluencers, dummyBrands } from '../data/dummyData.js';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (email: string, password: string, name: string, userType: 'influencer' | 'brand') => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy authentication logic
    const allUsers = [...dummyInfluencers, ...dummyBrands];
    const foundUser = allUsers.find(u => u.email === email);

    if (!foundUser) {
      return { success: false, message: 'User not found' };
    }

    // In real app, you'd verify password hash here
    if (password !== 'password123') {
      return { success: false, message: 'Invalid password' };
    }

    // Generate dummy JWT token
    const token = `dummy-jwt-${Date.now()}-${Math.random()}`;
    
    // Store token and user data
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(foundUser));
    
    setUser(foundUser);
    setIsAuthenticated(true);

    return { success: true, message: 'Login successful' };
  };

  const signup = async (email: string, _password: string, name: string, userType: 'influencer' | 'brand'): Promise<{ success: boolean; message: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const allUsers = [...dummyInfluencers, ...dummyBrands];
    const existingUser = allUsers.find(u => u.email === email);

    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    // Create new user (in real app, this would be saved to database)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      userType,
      isOnboarded: false,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    // Generate dummy JWT token
    const token = `dummy-jwt-${Date.now()}-${Math.random()}`;
    
    // Store token and user data
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsAuthenticated(true);

    return { success: true, message: 'Signup successful' };
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
