// Phase4.tsx

import { Phase4Props } from "@/types/types";
import { useEffect, useState } from "react";

export default function Phase4({onPrevious, onSubmit }: Phase4Props) {



    return (
        <div className="phase">
            <h2 className="text-center text-2xl mb-4">Fase 2: Más selecciones</h2>
            {/* Añade contenido de la fase 2 aquí */}
            <button
                type="submit"
                className="block ml-auto bg-blue-500 text-white py-2 px-4 rounded"
                onClick={onSubmit}
            >
                Enviar
            </button>
            <button 
                type="button" 
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={onPrevious}
            >
                Anterior Fase
            </button>
        </div>
    );
}