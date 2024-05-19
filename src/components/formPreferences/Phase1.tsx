// Phase1.tsx
import ImageInput from "@/components/inputSeleccion";
import { Country, Phase1Props } from "@/types/types";
import { useState, useEffect } from "react";

export default function Phase1({ countries, onNext, onCardsSelected }: Phase1Props) {
    const [selectedCards, setSelectedCards] = useState<string[]>([]); // Cambio a string[]
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
            <h2 className="text-center text-2xl mb-4 text-black">Selecciona el pais de origen de películas que más te gustan</h2>
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
            <div className="flex justify-between items-center">
                <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
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
