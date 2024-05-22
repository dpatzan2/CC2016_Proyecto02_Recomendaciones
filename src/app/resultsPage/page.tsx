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
                <h1 className="font-bold text-4xl mb-4">Películas con mayor compatibilidad</h1>
                {filteredMoviesPaginated.length > 0 ? (
                    <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-5">
                        {filteredMoviesPaginated.map((movie) => (
                            <MovieCard key={movie.id.low} movie={movie} onClick={handleCardClick} />
                        ))}
                    </section>
                ) : (
                    <p>No movies found for the selected filters.</p>
                )}
                {
                    filteredMoviesPaginated.length > 0 ? (
                        <div className="flex justify-center space-x-2 pt-10">
                            <button
                                disabled={currentPageFiltered === 1}
                                onClick={() => handlePageChange(setCurrentPageFiltered, currentPageFiltered - 1)}
                            >
                                Previous
                            </button>
                            <button
                                disabled={currentPageFiltered === totalRelatedPages}
                                onClick={() => handlePageChange(setCurrentPageFiltered, currentPageFiltered + 1)}
                            >
                                Next
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </div>

            <div className="text-center p-10">
                <h1 className="font-bold text-4xl mb-4">Películas relacionadas</h1>
                {relatedMoviesPaginated.length > 0 ? (
                    <section className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-5">
                        {relatedMoviesPaginated.map((movie) => (
                            <MovieCard key={movie.id.low} movie={movie} onClick={handleCardClick} />
                        ))}
                    </section>
                ) : (
                    <p>No related movies found.</p>
                )}
                {
                    relatedMoviesPaginated.length > 0 ? (
                        <div className="flex justify-center space-x-2 pt-10">
                            <button
                                disabled={currentPageRelated === 1}
                                onClick={() => handlePageChange(setCurrentPageRelated, currentPageRelated - 1)}
                            >
                                Previous
                            </button>
                            <button
                                disabled={currentPageRelated === totalRelatedPages}
                                onClick={() => handlePageChange(setCurrentPageRelated, currentPageRelated + 1)}
                            >
                                Next
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                }
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
