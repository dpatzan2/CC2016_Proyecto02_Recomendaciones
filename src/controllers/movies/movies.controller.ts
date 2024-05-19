
import connectionDB from '@/db/connect';
import { Movie, UserPreferences } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

  
export const getAllMovies = async () => {
    try {
        const driver = await connectionDB();
        const session = driver.session();
        const result = await session.run(
            `MATCH (u:Movies) RETURN u`
        );
        session.close();
        return result.records.map(( record: any ) =>  { return {...record.toObject().u.properties, id: record.toObject().u.identity.toNumber()}});
    } catch (error) {
       console.log(error)
    }
}


export const getFilteredMovies = async (preferences: UserPreferences): Promise<Movie[]> => {
    try {
        const driver = await connectionDB();
        const session = driver.session();
        const { preferredCountries, preferredActors, durationRange, releaseYearRange } = preferences;

        const result = await session.run(`
            MATCH (m:Movies)
            WHERE m.countryOrigin IN $preferredCountries
              OR (m.principalActors__001 IN $preferredActors OR m.principalActors__002 IN $preferredActors)
              OR m.year >= $releaseYearRangeMin AND m.year <= $releaseYearRangeMax
              OR toFloat(split(m.duration, ':')[0]) * 60 + toFloat(split(m.duration, ':')[1]) >= $durationRangeMin
              OR toFloat(split(m.duration, ':')[0]) * 60 + toFloat(split(m.duration, ':')[1]) <= $durationRangeMax
            RETURN m
        `, {
            preferredCountries,
            preferredActors,
            durationRangeMin: durationRange.min,
            durationRangeMax: durationRange.max,
            releaseYearRangeMin: releaseYearRange.min,
            releaseYearRangeMax: releaseYearRange.max,
        });

        const movies = result.records.map((record: any) => {
            const movie = record.get('m').properties;
            return {
                title: movie.title,
                duration: movie.duration,
                year: movie.year,
                genres: [movie.genres__001, movie.genres__002],
                releaseDate: movie.releaseDate,
                principalActors: [movie.principalActors__001, movie.principalActors__002],
                id: movie.id,
                countryOrigin: movie.countryOrigin,
            };
        });

        session.close();
        return movies;
    } catch (error) {
        console.error('Error fetching filtered movies:', error);
        throw error;
    }
};

