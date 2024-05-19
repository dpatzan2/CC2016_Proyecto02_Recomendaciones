
export interface Actors {
    id: string;
    completeName: string;
    country: string;
    picture: string;
}

export interface Country {
    id: string;
    countryName: string;
}

export interface Movie {
    duration: string;
    year: number;
    genres: string[];
    releaseDate: string;
    principalActors: string[];
    id: number;
    countryOrigin: string;
    title: string;
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
    preferredCountries: number[];
    preferredActors: number[];
    durationRange: DurationRange;
    releaseYearRange: ReleaseYearRange;
}

export interface Phase1Props {
    countries: Country[];
    onNext: () => void;
    onCardsSelected: (selectedCards: number[]) => void;
}

export interface Phase2Props {
    actors: Actors[];
    onNext: () => void;
    onPrevious: () => void;
    onCardsSelected: (selectedCards: number[]) => void;
}


export interface Phase3Props {
    onPrevious: () => void;
    onNext: (durationRange: { min: string; max: string }) => void;
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