# Proyecto de Algoritmo de Recomendación de Películas

### Descripción

Este proyecto es un sistema de recomendaciones de películas construido en Next.js con una base de datos Neo4j. El proyecto está alojado en Vercel y se puede acceder a través del siguiente enlace: [Proyecto de Recomendaciones](https://cc-2016-proyecto02-recomendaciones.vercel.app/).

### Requerimientos de Software

- Node.js (v14 o superior)
- Neo4j (v4.0 o superior)
- NPM (v6 o superior) o Yarn (opcional)

### Instalación

1. **Clonar el repositorio:**

    ```sh
    git clone https://github.com/dpatzan2/CC2016_Proyecto02_Recomendaciones.git
    cd proyecto2
    ```

2. **Instalar dependencias:**

    Con NPM:

    ```sh
    npm install
    ```

    Con Yarn:

    ```sh
    yarn install
    ```

3. **Configurar variables de entorno:**

    Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

    ```env
    NEO4J_URI=bolt://localhost:7687
    NEO4J_USER=tu_usuario
    NEO4J_PASSWORD=tu_contraseña
    ```

4. **Ejecutar la aplicación en modo desarrollo:**

    ```sh
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:3000`.

### Scripts Disponibles

- `npm run dev`: Inicia la aplicación en modo desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run start`: Inicia la aplicación en modo producción.
- `npm run lint`: Ejecuta linter para el código del proyecto.

### Incluir el Sistema como Motor de Recomendaciones en Otras Aplicaciones

Para utilizar este sistema de recomendaciones como un motor en otras aplicaciones, sigue los siguientes pasos:

1. **Crear un endpoint API en el proyecto actual:**

    Crear un nuevo archivo en `pages/api/recommendations.js` con la lógica para obtener recomendaciones de películas:

    ```js
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
            return result.records.map((record: any) =>  { 
                return {...record.toObject().u.properties, id: record.toObject().u.identity.toNumber()};
            });
        } catch (error) {
           console.log(error)
        }
    };

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

    export default async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method === 'POST') {
            const preferences: UserPreferences = req.body.preferences;
            const queryType: number = req.body.queryType;

            try {
                const movies = await getFilteredMovies(preferences, queryType);
                res.status(200).json(movies);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching movies' });
            }
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    };
    ```

2. **Consumir el endpoint desde otra aplicación:**

    Puedes hacer una petición HTTP desde otra aplicación para obtener las recomendaciones:

    ```js

    // Ejemplo de uso
    const handleFinalSubmit = async () => {
        const preferences = {
            preferredCountries: phase1Cards,
            preferredActors: phase2Cards,
            preferredGenders: phase3Cards,
            releaseYearRange: { min: yearRange.min, max: yearRange.max },
        };

        try {
            const movies = await getRecommendations(preferences, 1);
            setFilteredMovies(movies);
            console.log('Filtered Movies:', movies);
            router.push('/resultsPage');
            
            const moviesRelated = await getRecommendations(preferences, 2);
            for (let i = moviesRelated.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [moviesRelated[i], moviesRelated[j]] = [moviesRelated[j], moviesRelated[i]];
            }

            setFilteredMoviesRelated(moviesRelated);
        } catch (error) {
            console.error("Error filtering movies:", error);
        }
    };
    ```

### Estructura del Proyecto

- `app/`: Contiene las páginas de Next.js.
- `components/`: Contiene los componentes de React reutilizables.
- `controllers/`: Contiene utilidades y configuraciones, como la conexión a Neo4j.
- `Context/`: Contiene estados globales
- `db/`: Contiene la conexion a la base de datos
- `types/`: Contiene las interfaces

### Contribución

Para contribuir a este proyecto, por favor, sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza los cambios necesarios y haz commit (`git commit -m 'Agrega nueva característica'`).
4. Envía los cambios a tu repositorio fork (`git push origin feature/nueva-caracteristica`).
5. Crea un pull request en GitHub.


---

### Integrantes

1. Diego Fernando Patzán Marroquín (23525)
2. Osman Emanuel de Leon Garcia (23428)
3. Ihan Gilberto Alexander Marrroquín Sequén (23108)
