
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '@/types/types';

interface FilteredMoviesContextProps {
    filteredMovies: Movie[];
    setFilteredMovies: (movies: Movie[]) => void;
    filteredMoviesRelated: Movie[];
    setFilteredMoviesRelated: (movies: Movie[]) => void;
}

const FilteredMoviesContext = createContext<FilteredMoviesContextProps | undefined>(undefined);

export const FilteredMoviesProvider = ({ children }: { children: ReactNode }) => {
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [filteredMoviesRelated, setFilteredMoviesRelated] = useState<Movie[]>([]);

    return (
        <FilteredMoviesContext.Provider value={{ filteredMovies, setFilteredMovies, filteredMoviesRelated, setFilteredMoviesRelated }}>
            {children}
        </FilteredMoviesContext.Provider>
    );
};

export const useFilteredMovies = (): FilteredMoviesContextProps => {
    const context = useContext(FilteredMoviesContext);
    if (!context) {
        throw new Error('useFilteredMovies must be used within a FilteredMoviesProvider');
    }
    return context;
};
