import { MovieCardProps } from '@/types/types';



export default function MovieCard({ movie, onClick }: MovieCardProps) {
  console.log('Movie:', movie);

  const formatID = (id: { low: number; high: number }) => id.low; 
  const formatYear = (year: { low: number; high: number }) => year.low; 
  const formatReleaseDate = (date: { year: { low: number; high: number }; month: { low: number; high: number }; day: { low: number; high: number }; hour: { low: number; high: number }; minute: { low: number; high: number } }) => 
    `${date.year.low}-${date.month.low}-${date.day.low} ${date.hour.low}:${date.minute.low}`;

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer bg-gray-800"
      onClick={onClick}
    >
      <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${movie.posterURL})` }}>
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-5">
        </div>
      </div>
      <div className="p-4 text-white">
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <ul className="flex flex-wrap space-x-2 text-sm mb-4">
          <li>{movie.duration}</li>
          <li>|</li>
          <li>{formatYear(movie.year)}</li>
          <li>|</li>
          <li>{movie.genres.join(', ')}</li>
        </ul>
        <p className="mt-2">{formatReleaseDate(movie.releaseDate)}</p>
        <p className="italic mt-1">{movie.countryOrigin}</p>
      </div>
    </div>
  );
}
