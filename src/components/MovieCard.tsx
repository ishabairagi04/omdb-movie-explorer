'use client';

import { Movie } from "@/types/movie";

type Props = {
  movie: Movie;
  onClick?: () => void;
};

const MovieCard = ({ movie, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      tabIndex={0}
      role="button"
     className="relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-md group transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:ring-2 hover:ring-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"

    >
      <div className="relative overflow-hidden">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="w-full h-[18rem] sm:h-72 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        />

        {/* Optional IMDb Rating */}
        {movie.imdbRating && (
          <div
            title="IMDb Rating"
            className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full shadow-md"
          >
            ⭐ {movie.imdbRating}
          </div>
        )}

        {/* Hover Overlay */}
    <div
  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg"
  style={{
    backdropFilter: "blur(10px)",
    background: "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1))",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 0 15px rgba(0,255,255,0.1), 0 0 25px rgba(255,0,255,0.1)",
  }}
>
  <span
    className="text-white text-sm font-medium px-3 py-1 rounded-lg shadow backdrop-blur-md transition-all duration-300 hover:scale-105"
    style={{
      background: "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(255,0,255,0.2))",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 0 10px rgba(0,255,255,0.3), 0 0 20px rgba(255,0,255,0.2)",
    }}
  >
    View Details
  </span>
</div>


      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-300 mt-1">
          {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)} • {movie.Year}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
