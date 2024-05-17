
import connectionDB from '@/db/connect';
import { Movie, UserPreferences } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const durationToSeconds = (duration: string): number => {
    const parts = duration.split(':');
    return (+parts[0]) * 3600 + (+parts[1]) * 60 + (+parts[2]);
  };
  
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


  export const filterMovies = async (preferences: UserPreferences): Promise<Movie[] | undefined> => {
      const { preferredCountries, preferredActors, durationRange, releaseYearRange } = preferences;
  
      const minDuration = durationToSeconds(durationRange.min);
      const maxDuration = durationToSeconds(durationRange.max);
  
      try {
          const driver = await connectionDB();
          const session = driver.session();
  
          const query = `
              MATCH (m:Movie)
              WHERE m.year >= $minYear AND m.year <= $maxYear
              AND toFloat(split(m.duration, ':')[0]) * 3600 + toFloat(split(m.duration, ':')[1]) * 60 + toFloat(split(m.duration, ':')[2]) >= $minDuration
              AND toFloat(split(m.duration, ':')[0]) * 3600 + toFloat(split(m.duration, ':')[1]) * 60 + toFloat(split(m.duration, ':')[2]) <= $maxDuration
              AND (m.countryOrigin IN $preferredCountries)
              AND EXISTS {
                  MATCH (a:Actor)
                  WHERE (a.completeName = m.principalActors__001 OR a.completeName = m.principalActors__002)
                  AND a.id IN $preferredActors
              }
              RETURN m
          `;
  
          const result = await session.run(query, {
              minYear: releaseYearRange.min,
              maxYear: releaseYearRange.max,
              minDuration,
              maxDuration,
              preferredCountries,
              preferredActors
          });
  
          session.close();
  
          return result.records.map((record: any) => {
              const movie = record.get('m').properties;
              return {
                  duration: movie.duration,
                  year: movie.year.toNumber(),
                  genres: [movie.genres__001, movie.genres__002].filter(Boolean),
                  releaseDate: movie.releaseDate,
                  principalActors: [movie.principalActors__001, movie.principalActors__002].filter(Boolean),
                  id: movie.id.toNumber(),
                  countryOrigin: movie.countryOrigin,
                  title: movie.title,
              } as Movie;
          });
      } catch (error) {
          console.log(error);
      }
  }