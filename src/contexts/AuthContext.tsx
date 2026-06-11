'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from 'src/api/auth';
import type { LoginData, SignupData, AuthResponse } from 'src/types';
import { ApiError } from 'src/api/client';

interface AuthContextType {
    user: AuthResponse['data']['user'] | null;
    token: string | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthResponse['data']['user'] | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Hydrate from localStorage on mount
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                // Ignore parse errors
            }
        }
        setLoading(false);
    }, []);

    const login = async (data: LoginData) => {
        try {
            const res = await authApi.login(data);
            setToken(res.access_token);
            setUser(res.user);
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('user', JSON.stringify(res.user));
            router.push('/create');
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new Error('An unexpected error occurred during login');
        }
    };

    const signup = async (data: SignupData) => {
        try {
            await authApi.signup(data);
            // Redirect to login after successful signup
            router.push('/login');
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new Error('An unexpected error occurred during signup');
        }
    };

    const logout = () => {
        authApi.logout().catch(() => {}); // Fire and forget
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
