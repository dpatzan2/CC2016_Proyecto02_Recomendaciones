
export interface Actors {
    id: string;
    completeName: string;
    country: string;
    picture: string;
}

export interface Genders {
    id: string;
    name: string;
    imageURL: string;
}

export interface Country {
    id: string;
    countryName: string;
    banner: string;
}
// types/types.ts
export interface Movie {
    id: { low: number; high: number };
    title: string;
    posterURL: string;
    duration: string;
    year: { low: number; high: number };
    genres: string[];
    releaseDate: { year: { low: number; high: number }; month: { low: number; high: number }; day: { low: number; high: number }; hour: { low: number; high: number }; minute: { low: number; high: number } };
    countryOrigin: string;
    principalActors: string[];
}


export interface DurationRange {
    min: string;
    max: string;
}

export interface ReleaseYearRange {
    min: number;
    max: number;
}

export interface UserPreferences {
    preferredCountries: string[];
    preferredActors: string[];
    preferredGenders: string[];
    releaseYearRange: { min: number; max: number };
}

export interface Phase1Props {
    countries: Country[];
    onNext: () => void;
    onCardsSelected: (selectedCards: string[]) => void;
}

export interface Phase2Props {
    actors: Actors[];
    onNext: () => void;
    onPrevious: () => void;
    onCardsSelected: (selectedCards: string[]) => void;
}

export interface Phase3Props {
    genders: Genders[];
    onNext: () => void;
    onPrevious: () => void;
    onCardsSelected: (selectedCards: string[]) => void;
}



// types.ts
export interface Phase4Props {
    onPrevious: () => void;
    onSubmit: (yearRange: { min: number; max: number }) => void;
}

export interface ImageInputProps {
    title: string;
    image: string;
    selected: boolean;
    onClick: () => void;
}

export interface User {
    username: string;
    password: string;
}

export interface AuthContextType {
    user: string | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}


export interface UserLogged {
    id: number;
    username: string;
}

export interface MovieCardProps {
    movie: Movie;
    onClick: () => void;
}