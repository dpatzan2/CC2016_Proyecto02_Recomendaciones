export interface User {
    id: string;
    title: string;
    year: string;
    genres: string[];
    releaseDate: string;
    posterURL: string;
    principalActors: string[];
    countryOrigin: string;
    durations: string;
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


export interface FormularioProps {
    selectedCards: number[];
    setSelectedCards: React.Dispatch<React.SetStateAction<number[]>>;
    currentPhase: number;
    setCurrentPhase: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    country: Country[];
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setCountry: React.Dispatch<React.SetStateAction<Country[]>>;
  }
  