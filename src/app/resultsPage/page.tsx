// ResultsPage.tsx
'use client';
import { useFilteredMovies } from '@/context/FilteredMoviesContext';

export default function ResultsPage() {
    const { filteredMovies, filteredMoviesRelated } = useFilteredMovies();

    return (
        <div>
            <h1>Filtered Movies</h1>
            <ul>
                {filteredMovies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
            <h1>Related Movies</h1>
            <ul>
                {filteredMoviesRelated.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}
