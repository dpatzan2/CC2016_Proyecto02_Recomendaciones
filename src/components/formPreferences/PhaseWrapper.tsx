'use client'
import { useEffect, useState } from "react";
import { getAllCountries } from "@/controllers/countries.controller";
import { Actors, Country } from "@/types/types";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import { getAllActors } from "@/controllers/actors.controller";
import Phase3 from "./Phase3";
import Phase4 from "./Phase4";
import { useAuth } from "@/context/AuthContext";

export default function PhaseWrapper() {
    const [currentPhase, setCurrentPhase] = useState<number>(1);
    const [countries, setCountries] = useState<Country[]>([]);
    const [actors, setActors] = useState<Actors[]>([]);
    const [phase1Cards, setPhase1Cards] = useState<number[]>([]);
    const [phase2Cards, setPhase2Cards] = useState<number[]>([]);
    const [durationRange, setDurationRange] = useState<{ min: string; max: string }>({ min: "", max: "" });
    const [yearRange, setYearRange] = useState<{ min: number; max: number }>({ min: 2020, max: 2022 });

    const { logout } = useAuth();

    useEffect(() => {
        async function fetchData() {
            const userDataContries = await getAllCountries();
            setCountries(userDataContries);
            const userDataActors = await getAllActors();
            console.log(userDataActors)
            setActors(userDataActors);
        }
        fetchData();
    }, []);

    const handleNextPhase = () => {
        setCurrentPhase(currentPhase + 1);
    }

    const handlePreviousPhase = () => {
        setCurrentPhase(currentPhase - 1);
    }

    const handleDurationRangeSelected = (range: { min: string; max: string }) => {
        setDurationRange(range);
        handleNextPhase();
    }

    const handleYearRangeSelected = (range: { min: number; max: number }) => {
        setYearRange(range);
        handleNextPhase();
    }

    const handleFinalSubmit = () => {
        console.log('Phase 1 Cards:', phase1Cards);
        console.log('Phase 2 Cards:', phase2Cards);
        console.log('Duration Range:', durationRange);
        console.log('Year Range:', yearRange);
        alert(`Selected cards:\nPhase 1: ${phase1Cards.join(', ')}\nPhase 2: ${phase2Cards.join(', ')}\nPhase 3: ${durationRange.min} ${durationRange.max}\nPhase 4: ${yearRange.min} ${yearRange.max}`);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 relative">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl" style={{ minHeight: '80vh', borderRadius: '50px' }}>
                <form>
                    {currentPhase === 1 && (
                        <Phase1
                            countries={countries}
                            onNext={handleNextPhase}
                            onCardsSelected={setPhase1Cards}
                        />
                    )}
                    {currentPhase === 2 && (
                        <Phase2
                            actors={actors}
                            onNext={handleNextPhase}
                            onPrevious={handlePreviousPhase}
                            onCardsSelected={setPhase2Cards}
                        />
                    )}

                    {currentPhase === 3 && (
                        <Phase3
                            onPrevious={handlePreviousPhase}
                            onNext={handleDurationRangeSelected}
                        />
                    )}

                    {currentPhase === 4 && (
                        <Phase4
                            onPrevious={handlePreviousPhase}
                            onSubmit={handleFinalSubmit}
                        />
                    )}
                </form>
            </div>
            <button
                onClick={logout}
                className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
}
