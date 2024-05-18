
import PhaseWrapper from "@/components/formPreferences/PhaseWrapper";
import { useAuth } from "@/context/AuthContext";

export default function Formulario() {

    const { user, logout } = useAuth();

    if (!user) {
        // Renderizar un mensaje o redireccionar si no está autenticado
        return <p>Loading...</p>;
    }
    return <PhaseWrapper />;
}
