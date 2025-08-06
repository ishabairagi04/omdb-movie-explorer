import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  query: string;
  setQuery: (val: string) => void;
  type: string;
  setType: (val: string) => void;
  year: string;
  setYear: (val: string) => void;
  onSearch: () => void;
};

const TopFilterBar = ({
  query,
  setQuery,
  type,
  setType,
  year,
  setYear,
  onSearch,
}: Props) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(stored);
  }, []);

  const handleSearchClick = () => {
    if (!query.trim()) return;
    const updated = [query.trim(), ...recentSearches.filter((q) => q !== query.trim())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    onSearch();
    setShowDropdown(false);
  };

  const handleSelectRecent = (val: string) => {
    setQuery(val);
    setShowDropdown(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-md px-4 py-4 md:px-6 md:py-5 shadow-lg border-b border-white/10">
      <div className="flex flex-wrap gap-3 items-center justify-between relative">
        {/* Search Input with Dropdown */}
        <div className="flex-1 min-w-[150px] relative">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f1f1f] border border-gray-700 shadow-inner">
            <IoSearch className="text-white text-lg" />
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="bg-transparent text-white outline-none w-full text-sm placeholder-gray-400"
            />
          </div>

          {/* Recent Searches Dropdown */}
          {showDropdown && recentSearches.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-[#1f1f1f] border border-gray-700 rounded-md mt-1 z-50 shadow-lg">
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectRecent(item)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Type Selector */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="min-w-[110px] text-sm px-4 py-2 rounded-full bg-[#1f1f1f] text-white border border-gray-700 hover:border-blue-500 shadow-md"
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>

        {/* Year Input */}
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-[90px] text-sm px-4 py-2 rounded-full bg-[#1f1f1f] text-white border border-gray-700 placeholder-gray-400 hover:border-blue-500 shadow-md"
        />

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg hover:scale-105 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default TopFilterBar;
