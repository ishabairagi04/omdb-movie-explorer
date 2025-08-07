'use client';

import { MovieDetails } from '@/types/movieDetail';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';

type Props = {
  movie: MovieDetails;
  onClose: () => void;
};

const MovieDetailsModal = ({ movie, onClose }: Props) => {
  const [showFullPlot, setShowFullPlot] = useState(false);
  const isLongPlot = movie.Plot.length > 350;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center px-4">
      {/* Scrollable modal if content overflows */}
      <div className="bg-gray-900 text-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
          aria-label="Close modal"
        >
          <IoClose />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image grows with content */}
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
            alt={movie.Title}
            className="w-full md:w-1/3 object-cover rounded-lg h-auto"
            style={{ maxHeight: '100%' }}
          />

          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-bold text-pink-400">{movie.Title}</h2>

            {/* Plot with Read More */}
            <p className="text-sm text-gray-300 whitespace-pre-line">
              {showFullPlot || !isLongPlot
                ? movie.Plot
                : `${movie.Plot.slice(0, 350)}...`}
            </p>

            {isLongPlot && (
              <button
                onClick={() => setShowFullPlot(!showFullPlot)}
                className="text-blue-400 hover:text-blue-300 text-sm underline focus:outline-none"
              >
                {showFullPlot ? 'Show Less' : 'Read More'}
              </button>
            )}

            <div className="text-sm text-gray-400 space-y-1">
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Released:</strong> {movie.Released}</p>
              <p><strong>Runtime:</strong> {movie.Runtime}</p>
              <p><strong>Rated:</strong> {movie.Rated}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Writer:</strong> {movie.Writer}</p>
              <p><strong>IMDb:</strong> ⭐ {movie.imdbRating} ({movie.imdbVotes})</p>
              <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
              <p><strong>Awards:</strong> {movie.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
