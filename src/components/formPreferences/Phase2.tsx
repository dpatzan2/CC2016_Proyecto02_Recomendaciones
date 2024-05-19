// Phase2.tsx
import { Phase2Props } from "@/types/types";
import { useState, useEffect } from "react";
import ImageInput from "../inputSeleccion";



export default function Phase2({ actors, onNext, onPrevious, onCardsSelected }: Phase2Props) {
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        onCardsSelected(selectedCards);
    }, [selectedCards, onCardsSelected]);

    const itemsPerPage = 9;
    const filteredCards = actors.filter(actors => actors.completeName.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
    const displayedCards = filteredCards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleCardClick = (id: number) => {
        setSelectedCards(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(cardId => cardId !== id) : [...prevSelected, id]
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
            <h2 className="text-center text-2xl mb-4 text-black">Selecciona el género de película que más te gustan</h2>
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
                {displayedCards.map(actors => (
                    <ImageInput
                        key={actors.id}
                        title={actors.completeName}
                        image='https://via.placeholder.com/150'
                        selected={selectedCards.includes(Number(actors.id))}
                        onClick={() => handleCardClick(Number(actors.id))}
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
            <div className="flex justify-between items-center mt-4">
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
                    onClick={onNext}
                >
                    Siguiente Fase
                </button>
            </div>
        </div>
    );
}
