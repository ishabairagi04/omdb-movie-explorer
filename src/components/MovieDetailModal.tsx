import { MovieDetail } from "@/types/movieDetail";

type Props = {
  movie: MovieDetail | null;
  onClose: () => void;
};

const MovieDetailModal = ({ movie, onClose }: Props) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-2xl rounded-lg overflow-y-auto max-h-[90vh] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
        >
          ✕
        </button>
        <div className="flex flex-col md:flex-row">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
            className="w-full md:w-1/3 object-cover rounded-l-lg"
          />
          <div className="p-6 space-y-2">
            <h2 className="text-2xl font-bold">{movie.Title}</h2>
            <p className="text-gray-600 italic">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
            <p className="text-sm text-gray-800 mt-2">{movie.Plot}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
