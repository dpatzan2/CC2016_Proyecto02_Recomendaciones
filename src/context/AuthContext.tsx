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
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log("Token encontrado:", token);

        if (token) {
            try {
                const decoded: any = JWT.jwtDecode(token);
                console.log("Token decodificado:", decoded);
                setUser(decoded.username);
            } catch (error) {
                console.error("Error decodificando el token:", error);
                Cookies.remove('token');
                setUser(null);
                router.push('/auth/singin');
            }
        } else {
            router.push('/auth/singin');
        }
    }, [router]);

    const login = (token: string) => {
        Cookies.set('token', token);
        const decoded: any = JWT.jwtDecode(token);
        console.log("Token decodificado al iniciar sesión:", decoded);
        setUser(decoded.username);
        router.push('/');
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/');
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
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
