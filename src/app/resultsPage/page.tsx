'use client';
import { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { useFilteredMovies } from '@/context/FilteredMoviesContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const { filteredMovies, filteredMoviesRelated } = useFilteredMovies();
    const itemsPerPage = 12;

    const [currentPageFiltered, setCurrentPageFiltered] = useState(1);
    const [currentPageRelated, setCurrentPageRelated] = useState(1);

    const totalFilteredPages = Math.ceil(filteredMovies.length / itemsPerPage);
    const totalRelatedPages = Math.ceil(filteredMoviesRelated.length / itemsPerPage);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/singin');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return null;
    }

    const handlePageChange = (setPage: (page: number) => void, newPage: number) => {
        setPage(newPage);
    };

    const filteredMoviesPaginated = filteredMovies.slice((currentPageFiltered - 1) * itemsPerPage, currentPageFiltered * itemsPerPage);
    const relatedMoviesPaginated = filteredMoviesRelated.slice((currentPageRelated - 1) * itemsPerPage, currentPageRelated * itemsPerPage);

    const handleCardClick = () => {
        router.push('/formulario')
    };

    return (
        <div>
            <div className="text-center p-10">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleCardClick}>
                    Intentar de nuevo
                </button>
                <h1 className="text-center mb-4 text-6xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Cuestionario para filtro de películas
                    </span>
                </h1>
                <h1 className="font-bold text-4xl mb-4">Películas con mayor compatibilidad</h1>
                {filteredMoviesPaginated.length > 0 ? (
                    <div className="relative w-full">
                        <button
                            type="button"
                            className="absolute top-1/2 transform -translate-y-1/2 left-2 z-30 flex items-center justify-center h-16 w-16 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
                            onClick={() => handlePageChange(setCurrentPageFiltered, currentPageFiltered - 1)}
                            disabled={currentPageFiltered === 1}
                        >
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-5">
                            {filteredMoviesPaginated.map((movie) => (
                                <MovieCard key={movie.id.low} movie={movie} onClick={handleCardClick} />
                            ))}
                        </section>
                        <button
                            type="button"
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 z-30 flex items-center justify-center h-16 w-16 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
                            onClick={() => handlePageChange(setCurrentPageFiltered, currentPageFiltered + 1)}
                            disabled={currentPageFiltered === totalFilteredPages}
                        >
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                ) : (
                    <p>No movies found for the selected filters.</p>
                )}
            </div>

            <div className="text-center p-10">
                <h1 className="font-bold text-4xl mb-4">Películas relacionadas</h1>
                {relatedMoviesPaginated.length > 0 ? (
                    <div className="relative w-full">
                        <button
                            type="button"
                            className="absolute top-1/2 transform -translate-y-1/2 left-2 z-30 flex items-center justify-center h-16 w-16 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
                            onClick={() => handlePageChange(setCurrentPageRelated, currentPageRelated - 1)}
                            disabled={currentPageRelated === 1}
                        >
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-5">
                            {relatedMoviesPaginated.map((movie) => (
                                <MovieCard key={movie.id.low} movie={movie} onClick={handleCardClick} />
                            ))}
                        </section>
                        <button
                            type="button"
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 z-30 flex items-center justify-center h-16 w-16 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
                            onClick={() => handlePageChange(setCurrentPageRelated, currentPageRelated + 1)}
                            disabled={currentPageRelated === totalRelatedPages}
                        >
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                ) : (
                    <p>No related movies found.</p>
                )}
            </div>

            <button
                onClick={logout}
                className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
            >
                Logout
            </button>

            <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                <p><strong>User:</strong> {user}</p>
            </div>
        </div>
    );
}
