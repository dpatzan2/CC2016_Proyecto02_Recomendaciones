// Phase3.tsx
import { Phase3Props } from "@/types/types";
import { useState } from "react";


export default function Phase3({ onPrevious, onNext }: Phase3Props) {
    const [minDuration, setMinDuration] = useState<string>("1:30:00");
    const [maxDuration, setMaxDuration] = useState<string>("2:30:00");

    const handleNext = () => {
        onNext({ min: minDuration, max: maxDuration });
    }

    return (
        <div className="phase">
            <h2 className="text-center text-2xl mb-4 text-black">Selecciona el rango de duración de las películas</h2>
            <hr />
            <br />
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minDuration">
                    Duración mínima
                </label>
                <input
                    type="text"
                    id="minDuration"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={minDuration}
                    onChange={(e) => setMinDuration(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxDuration">
                    Duración máxima
                </label>
                <input
                    type="text"
                    id="maxDuration"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                    onClick={onPrevious}
                >
                    Anterior Fase
                </button>
                <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleNext}
                >
                    Siguiente Fase
                </button>
            </div>
        </div>
    );
}
