import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { login } from '../services/userService';
import { api, setupResponseInterceptor } from '../services/api';

interface UserLogin {
    id: string;
    name: string;
    email: string;
    userPic?: string;
    role: string;
    token?: string;
}

interface AuthContextType {
    signedIn: boolean;
    user: UserLogin | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    updateUser: (data: Partial<UserLogin>) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserLogin | null>(null);
    const [loading, setLoading] = useState(true);

    // Carregamento inicial dos dados do usuário
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Interceptor para desconectar automaticamente quando o token expira
    useEffect(() => {
        const interceptorId = setupResponseInterceptor(signOut);

        return () => {
            api.interceptors.response.eject(interceptorId);
        };
    }, [signOut]);

    // Tentativa de login
    async function signIn(email: string, password: string) {
        try {
            const response = await login(email, password);
            const userData = response.user;
            const token = response.token;

            setUser(userData);

            localStorage.setItem('user', JSON.stringify(userData));
            if (token) {
                localStorage.setItem('token', token);
            }
        } catch (error) {
            throw error;
        }
    }

    // Logout
    function signOut() {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    // Atualização dos dados do usuário
    function updateUser(data: Partial<UserLogin>) {
        setUser(prev => {
            if (!prev) return prev;
            const updated = { ...prev, ...data };
            localStorage.setItem('user', JSON.stringify(updated));
            return updated;
        });
    }

    // Valores do contexto
    const value = {
        signedIn: !!user,
        user,
        signIn,
        signOut,
        updateUser,
        loading
    };

    // Renderização do provider
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Hook para uso do contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

