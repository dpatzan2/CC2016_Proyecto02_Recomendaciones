// Phase1.tsx
import ImageInput from "@/components/inputSeleccion";
import { Country, Phase1Props } from "@/types/types";
import { useState, useEffect } from "react";

export default function Phase1({ countries, onNext, onCardsSelected }: Phase1Props) {
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        onCardsSelected(selectedCards);
    }, [selectedCards, onCardsSelected]);

    const itemsPerPage = 9;
    const filteredCards = countries.filter(country => country.countryName.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
    const displayedCards = filteredCards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleCardClick = (countryName: string) => {
        setSelectedCards(prevSelected =>
            prevSelected.includes(countryName) ? prevSelected.filter(name => name !== countryName) : [...prevSelected, countryName]
        );
    }

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    }

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    }

    return (
        <div className="phase">
            <div className="text-center">
                <h1 className="text-center mb-4 text-6xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Cuestionario para filtro de peliculas
                    </span>
                </h1>
                <h1 className="text-center text-2xl mb-4 text-black">FASE 1 - Paises de origen de peliculas</h1>
            </div>
            <h2 className="text-center text-xl mb-4 text-black">Selecciona el pais de origen de películas que más te gustan</h2>
            <hr />
            <br />
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="relative w-full">
                <button
                    type="button"
                    className="absolute top-1/2 transform -translate-y-1/2 left-2 z-30 flex items-center justify-center h-10 w-10 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <button
                    type="button"
                    className="absolute top-1/2 transform -translate-y-1/2 right-2 z-30 flex items-center justify-center h-10 w-10 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {displayedCards.map(country => (
                        <ImageInput
                            key={country.id}
                            title={country.countryName}
                            image={country.banner}
                            selected={selectedCards.includes(country.countryName)}
                            onClick={() => handleCardClick(country.countryName)}
                        />
                    ))}
                </div>
                <div className="absolute z-30 flex space-x-3 rtl:space-x-reverse bottom-5 left-1/2 transform -translate-x-1/2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${currentPage === index + 1 ? 'bg-blue-600' : 'bg-gray-300'}`}
                            aria-current={currentPage === index + 1}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setCurrentPage(index + 1)}
                        ></button>
                    ))}
                </div>
            </div>
            <button
                type="button"
                className="block mt-4 ml-auto bg-blue-500 text-white py-2 px-4 rounded"
                onClick={onNext}
            >
                Siguiente Fase
            </button>
        </div>
    );
}
