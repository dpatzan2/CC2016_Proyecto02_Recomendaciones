
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


export const getFilteredMovies = async (preferences: UserPreferences, query: number): Promise<Movie[]> => {
    try {
        const driver = await connectionDB();
        const session = driver.session();
        let movies: Movie[] = [];

        const { preferredCountries, preferredActors, preferredGenders, releaseYearRange } = preferences;

        const countryFilter = preferredCountries.length > 0 ? "c.countryName IN $preferredCountries" : "true";
        const actorsFilter = preferredActors.length > 0 ? "a.completeName IN $preferredActors" : "true";
        const gendersFilter = preferredGenders.length > 0 ? "g.name IN $preferredGenders" : "true";

        const runQuery = async (filters: string): Promise<Movie[]> => {
            const queryData = `
                MATCH (m:Movies)
                OPTIONAL MATCH (c:Contries)-[:ORIGIN_OF]->(m)
                OPTIONAL MATCH (a:Actors)-[:ACTED_IN]->(m)
                OPTIONAL MATCH (g:Genders)-[:GENRE_OF]->(m)
                WHERE ${filters}
                RETURN DISTINCT m
            `;

            const result = await session.run(queryData, {
                preferredCountries,
                preferredActors,
                preferredGenders,
                releaseYearRangeMin: releaseYearRange.min,
                releaseYearRangeMax: releaseYearRange.max,
            });

            return result.records.map((record: any) => {
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
                    posterURL: movie.posterURL
                };
            });
        };

        if (query === 1) {
            // Calculate a score for each movie based on how well it matches the preferences
            const queryData = `
                MATCH (m:Movies)
                OPTIONAL MATCH (c:Contries)-[:ORIGIN_OF]->(m)
                OPTIONAL MATCH (a:Actors)-[:ACTED_IN]->(m)
                OPTIONAL MATCH (g:Genders)-[:GENRE_OF]->(m)
                WITH m, 
                     CASE WHEN ${countryFilter} THEN 1 ELSE 0 END AS countryScore,
                     CASE WHEN ${actorsFilter} THEN 1 ELSE 0 END AS actorScore,
                     CASE WHEN ${gendersFilter} THEN 1 ELSE 0 END AS genreScore
                RETURN DISTINCT m, (countryScore + actorScore + genreScore) AS totalScore
                ORDER BY totalScore DESC, m.releaseDate DESC
                LIMIT 50
            `;

            const result = await session.run(queryData, {
                preferredCountries,
                preferredActors,
                preferredGenders,
                releaseYearRangeMin: releaseYearRange.min,
                releaseYearRangeMax: releaseYearRange.max,
            });

            movies = result.records.map((record: any) => {
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
                    posterURL: movie.posterURL
                };
            });
        } else if (query === 2) {
            const queryData = `
                MATCH (m:Movies)
                OPTIONAL MATCH (c:Contries)-[:ORIGIN_OF]->(m)
                OPTIONAL MATCH (a:Actors)-[:ACTED_IN]->(m)
                OPTIONAL MATCH (g:Genders)-[:GENRE_OF]->(m)
                WHERE ${countryFilter}
                   OR ${actorsFilter}
                   OR ${gendersFilter}
                RETURN DISTINCT m
                LIMIT 50
            `;

            const result = await session.run(queryData, {
                preferredCountries,
                preferredActors,
                preferredGenders,
                releaseYearRangeMin: releaseYearRange.min,
                releaseYearRangeMax: releaseYearRange.max,
            });

            movies = result.records.map((record: any) => {
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
                    posterURL: movie.posterURL
                };
            });
        }

        await session.close();
        return movies;
    } catch (error) {
        console.error('Error fetching filtered movies:', error);
        throw error;
    }
};


