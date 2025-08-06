import { useEffect, useState } from "react";

type Props = {
  onSearch: (page: number, query: string, type: string, year: string) => void;
  scrolled: boolean;
};

export default function SearchBar({ onSearch, scrolled }: Props) {
  const [query, setQuery] = useState("batman");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  // Add to recent searches
  const updateRecentSearches = (newQuery: string) => {
    const updated = [newQuery, ...recentSearches.filter((q) => q !== newQuery)];
    const limited = updated.slice(0, 5);
    setRecentSearches(limited);
    localStorage.setItem("recentSearches", JSON.stringify(limited));
  };

  const handleSearchClick = () => {
    if (!query.trim()) return;
    updateRecentSearches(query.trim());
    onSearch(1, query.trim(), type, year);
  };

  const handleRecentClick = (q: string) => {
    setQuery(q);
    onSearch(1, q, type, year);
  };

  return (
    <div
      className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-500 ${
        scrolled ? "bg-white/10 shadow-lg ring-1 ring-white/10" : "bg-white/5"
      } p-6 mb-10 rounded-xl`}
    >
     
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={query}
          placeholder="Search movies..."
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-24 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearchClick}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:scale-105 transform transition duration-200"
        >
          🔍 Search
        </button>
      </div>

      {/* Recent Searches */}
{/* Recent Searches - Show only when typing */}
{query.length > 0 && recentSearches.length > 0 && (
  <div className="mt-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-300 font-semibold">Recent Searches:</span>
      <button
        onClick={() => {
          localStorage.removeItem("recentSearches");
          setRecentSearches([]);
        }}
        className="text-xs text-red-400 hover:text-red-300 transition"
      >
        Clear All
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {recentSearches.map((q) => (
        <div
          key={q}
          className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-500 transition group"
        >
          <button
            onClick={() => {
              setQuery(q);
           onSearch(1, q, type, year);

            }}
            className="mr-2 focus:outline-none"
          >
            {q}
          </button>
          <button
            onClick={() => {
              const updated = recentSearches.filter((item) => item !== q);
              setRecentSearches(updated);
              localStorage.setItem("recentSearches", JSON.stringify(updated));
            }}
            className="text-xs text-gray-300 hover:text-red-400 focus:outline-none"
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}
