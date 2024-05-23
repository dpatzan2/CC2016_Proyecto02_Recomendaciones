import { MovieCardProps } from '@/types/types';

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  console.log('Movie:', movie);

  const formatID = (id: { low: number; high: number }) => (id && id.low) ? id.low : 'N/A'; 
  const formatYear = (year: { low: number; high: number }) => (year && year.low) ? year.low : 'N/A'; 
  const formatReleaseDate = (date: { year: { low: number; high: number }; month: { low: number; high: number }; day: { low: number; high: number }}) => 
    date && date.year && date.month && date.day ? 
    `${date.year.low}-${date.month.low}-${date.day.low}` : 
    'N/A';

  return (
    <div
      className="bg-center relative rounded-lg overflow-hidden bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
      onClick={onClick}
    >
      <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${movie.posterURL})` }}>
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-1">
          <p className="italic mt-1">{movie.countryOrigin}</p>
        </div>
      </div>
      <div className="p-4 text-white ">
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <ul className="flex flex-wrap space-x-2 text-sm mb-4">
          <li>{movie.duration}</li>
          <li>|</li>
          <li>{formatYear(movie.year)}</li>
          <li>|</li>
          <li>{movie.genres.join(', ')}</li>
        </ul>
        <p className="mt-2">{formatReleaseDate(movie.releaseDate)}</p>
      </div>
    </div>
  );
}
