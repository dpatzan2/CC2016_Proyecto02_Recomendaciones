// Phase4.tsx

import { Phase4Props } from "@/types/types";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

export default function Phase4({ onPrevious, onSubmit }: Phase4Props) {
    const [yearRange, setYearRange] = useState<{ min: number; max: number }>({ min: 2000, max: 2024 });

    const handleRangeChange = (values: number[]) => {
        setYearRange({ min: values[0], max: values[1] });
    };

    return (
        <div className="phase relative">
            <h2 className="text-center text-2xl mb-4 text-black">Fase 4: Selecciona el Rango de Años</h2>
            <div className="flex flex-col items-center pt-10">
                <Range
                    values={[yearRange.min, yearRange.max]}
                    step={1}
                    min={2000}
                    max={2025}
                    onChange={handleRangeChange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                width: '100%',
                                background: getTrackBackground({
                                    values: [yearRange.min, yearRange.max],
                                    colors: ['#ccc', '#548BF4', '#ccc'],
                                    min: 2000,
                                    max: 2025
                                }),
                                borderRadius: '4px'
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '20px',
                                backgroundColor: '#548BF4',
                                borderRadius: '50%'
                            }}
                        />
                    )}
                />
                <div className="flex justify-between w-full mt-2 text-black">
                    <span>{yearRange.min}</span>
                    <span>{yearRange.max}</span>
                </div>
            </div>
            <div className="flex justify-between pt-10">
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
                    onClick={() => onSubmit(yearRange)}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}
