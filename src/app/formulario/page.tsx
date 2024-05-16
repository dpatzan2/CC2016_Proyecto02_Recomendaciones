'use client'

import ImageInput from "@/components/inputSeleccion";
import { useState } from "react";

export default function Formulario() {
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [currentPhase, setCurrentPhase] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const cards = [
        { id: 1, title: 'Action', image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Comedy', image: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Drama', image: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Horror', image: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Romance', image: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Sci-Fi', image: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Thriller', image: 'https://via.placeholder.com/150' },
        { id: 8, title: 'Adventure', image: 'https://via.placeholder.com/150' },
        { id: 9, title: 'Animation', image: 'https://via.placeholder.com/150' },
        { id: 10, title: 'Fantasy', image: 'https://via.placeholder.com/150' },
        { id: 11, title: 'Mystery', image: 'https://via.placeholder.com/150' },
        { id: 12, title: 'Biography', image: 'https://via.placeholder.com/150' },
    ];

    const itemsPerPage = 9;
    const filteredCards = cards.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
    const displayedCards = filteredCards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleCardClick = (id: number) => {
        setSelectedCards(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(cardId => cardId !== id) : [...prevSelected, id]
        );
    }

    const handlePreviousPhase = () => {
        setCurrentPhase(currentPhase - 1);
        setCurrentPage(1); 
      }

    const handleNextPhase = () => {
        setCurrentPhase(currentPhase + 1);
        setCurrentPage(1); 
    }

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    }

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert(`Selected cards: ${selectedCards.join(', ')}`);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl" style={{ minHeight: '80vh', borderRadius: '50px' }}>
                <form onSubmit={handleSubmit}>
                    {currentPhase === 1 && (
                        <div className="phase">
                            <h2 className="text-center text-2xl mb-4">Selecciona el género de película que más te gustan</h2>
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-inherit text-black"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {displayedCards.map(card => (
                                    <ImageInput
                                        key={card.id}
                                        title={card.title}
                                        image={card.image}
                                        selected={selectedCards.includes(card.id)}
                                        onClick={() => handleCardClick(card.id)}
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
                                onClick={handleNextPhase}
                            >
                                Siguiente Fase
                            </button>
                        </div>
                    )}
                    {currentPhase === 2 && (
                        <div className="phase">
                            <h2 className="text-center text-2xl mb-4">Fase 2: Más selecciones</h2>
                            {/* Añade contenido de la fase 2 aquí */}
                            <button
                                type="submit"
                                className="block ml-auto bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Enviar
                            </button>
                            <button 
                    type="button" 
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                    onClick={handlePreviousPhase}
                  >
                    Anterior Fase
                  </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}