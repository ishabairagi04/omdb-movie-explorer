"use client";
import { useState, useEffect } from "react";
import { fetchMovies, fetchMovieById } from "@/utils/fetchMovies";
import { Movie } from "@/types/movie";
import { MovieDetail } from "@/types/movieDetail";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import MovieDetailModal from "@/components/MovieDetailModal";
import SearchBar from "@/components/SearchBar";

export default function Home() {
 
  const [results, setResults] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
 
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [showModal, setShowModal] = useState(false);
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const openMovieModal = async (imdbID: string) => {
    try {
      setLoading(true);
      const data = await fetchMovieById(imdbID);
      setSelectedMovie(data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 const handleSearch = async (
  pageNumber = 1,
  query = "batman",
  type = "",
  year = ""
) => {
  if (!query.trim()) return;

  try {
    setLoading(true);
    setError("");
    const data = await fetchMovies(query, type, year, pageNumber);
    setResults(data.Search || []);
    setTotalResults(Number(data.totalResults) || 0);
    setPage(pageNumber);
  } catch (err: any) {
    setError(err.message);
    setResults([]);
    setTotalResults(0);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <main className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-500 drop-shadow-lg">
          🎬 Movie Explorer
        </h1>

        {/* Search & Filters */}
 <SearchBar
  onSearch={handleSearch}
  scrolled={scrolled}
/>
        {/* Loading/Error */}
    {loading && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, idx) => (
      <div
        key={idx}
        className="bg-gray-900 border border-gray-800 rounded-lg animate-pulse h-[350px]"
      >
        <div className="bg-gray-700 h-[270px] w-full" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
)}

        {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

        {/* Movie Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onClick={() => openMovieModal(movie.imdbID)} />
          ))}
        </div>

        {/* Empty State */}
        {!loading && results.length === 0 && (
      <div className="text-center text-gray-400 mt-10 space-y-2">
  <p className="text-2xl">😢 No movies found</p>
  <p className="text-sm">Try different keywords, year or type.</p>
</div>

        )}

        {/* Pagination */}
        {totalResults > 10 && (
          <div className="mt-12">
            <Pagination
              currentPage={page}
              totalResults={totalResults}
              onPageChange={(newPage) => handleSearch(newPage)}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => {
            setShowModal(false);
            setSelectedMovie(null);
          }}
        />
      )}
    </main>
  );
}
