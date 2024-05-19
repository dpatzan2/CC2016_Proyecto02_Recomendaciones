'use client';

import PhaseWrapper from "@/components/formPreferences/PhaseWrapper";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Formulario() {
    const { user } = useAuth();

    if (!user) {
        return <p>Loading...</p>; // O redirigir a una página de carga
    }

    return <PhaseWrapper />;
}
