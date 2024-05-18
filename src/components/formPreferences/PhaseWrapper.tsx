'use client'
import { useEffect, useState } from "react";
import { getAllCountries } from "@/controllers/countries.controller";
import { Actors, Country } from "@/types/types";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import { getAllActors } from "@/controllers/actors.controller";

export default function PhaseWrapper() {
    const [currentPhase, setCurrentPhase] = useState<number>(1);
    const [countries, setCountries] = useState<Country[]>([]);
    const [actors, setActors] = useState<Actors[]>([]);
    const [phase1Cards, setPhase1Cards] = useState<number[]>([]);
    const [phase2Cards, setPhase2Cards] = useState<number[]>([]);

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

    const handleSubmit = (selectedCards: number[]) => {
        console.log('Phase 1 Cards:', phase1Cards);
        console.log('Phase 2 Cards:', phase2Cards);
        alert(`Selected cards:\nPhase 1: ${phase1Cards.join(', ')}\nPhase 2: ${selectedCards.join(', ')}`);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
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
                            onCardsSelected={setPhase2Cards}
                        />
                    )}
                </form>
            </div>
        </div>
    );
}
