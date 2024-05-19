'use client'
import { useEffect, useState } from "react";
import { getAllCountries } from "@/controllers/countries.controller";
import { Actors, Country, Movie, UserPreferences } from "@/types/types";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import { getAllActors } from "@/controllers/actors.controller";
import Phase3 from "./Phase3";
import Phase4 from "./Phase4";
import { useAuth } from "@/context/AuthContext";
import { getAllMovies, getFilteredMovies } from "@/controllers/movies/movies.controller";
import { useRouter } from "next/navigation";

export default function PhaseWrapper() {
    const [currentPhase, setCurrentPhase] = useState<number>(1);
    const [countries, setCountries] = useState<Country[]>([]);
    const [actors, setActors] = useState<Actors[]>([]);
    const [phase1Cards, setPhase1Cards] = useState<string[]>([]);
    const [phase2Cards, setPhase2Cards] = useState<string[]>([]); 
    const [durationRange, setDurationRange] = useState<{ min: string; max: string }>({ min: "", max: "" });
    const [yearRange, setYearRange] = useState<{ min: number; max: number }>({ min: 2000, max: 2024 });
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const router = useRouter();


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

    const handleFinalSubmit = async () => {
        console.log(phase1Cards);
        const preferences: UserPreferences = {
            preferredCountries: phase1Cards,
            preferredActors: phase2Cards,
            durationRange: { min: durationRange.min, max: durationRange.max },
            releaseYearRange: { min: yearRange.min, max: yearRange.max },
        };

        try {
             const movies = await getFilteredMovies(preferences);
             setFilteredMovies(movies)
             console.log('Filtered Movies:', movies);
             router.push('/ResultsPage');
             
        } catch (error) {
            console.error("Error filtering movies:", error);
        }
    }

    

    return (
        <div className="flex items-center justify-center min-h-screen bg-page relative">
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
