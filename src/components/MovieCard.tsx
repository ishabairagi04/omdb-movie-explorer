import { Movie } from "@/types/movie";

type Props = {
  movie: Movie;
  onClick?: () => void;
};

const MovieCard = ({ movie, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all cursor-pointer group"
    >
      <div className="relative">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-medium bg-blue-600 px-3 py-1 rounded-lg shadow">
            View Details
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)} • {movie.Year}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
