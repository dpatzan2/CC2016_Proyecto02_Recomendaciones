
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as JWT from 'jwt-decode';
import Cookies from 'js-cookie';

interface AuthContextType {
    user: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decoded: any = JWT.jwtDecode(token);
            setUser(decoded.username);
        }
    }, []);

    const login = (token: string) => {
        Cookies.set('token', token);
        const decoded: any = JWT.jwtDecode(token);
        setUser(decoded.username);
        router.push('/');
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/auth/singin');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
