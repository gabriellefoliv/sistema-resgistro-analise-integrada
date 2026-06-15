import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";

export function Private({ children }: { children: ReactNode }) {
    const { signedIn, loading } = useAuth();

    if (loading) return <div>Carregando...</div>;

    if (!signedIn) return <Navigate to='/login' />;

    return children;

}