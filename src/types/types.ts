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

export interface Phase4Props {
    onPrevious: () => void;
    onSubmit: () => void;
}
