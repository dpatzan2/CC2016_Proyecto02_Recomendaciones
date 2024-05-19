'use client';

import PhaseWrapper from "@/components/formPreferences/PhaseWrapper";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Formulario() {
    const { user, loading } = useAuth();
    const router = useRouter();
    console.log("Usuario en Formulario:", user);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/singin');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>; 
    }
    if (!user) {
        return null; 
    }

    console.log(user)
    return <PhaseWrapper />;
}
