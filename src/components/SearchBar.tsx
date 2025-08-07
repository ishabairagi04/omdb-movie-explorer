import React, { useEffect, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { Listbox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

type Props = {
  onSearch: (page: number, query: string, type: string, year: string) => void;
  scrolled: boolean;
};

const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

const [showYearSuggestions, setShowYearSuggestions] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(stored);

    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchClick = () => {
    if (!query.trim()) return;
    const updated = [query.trim(), ...recentSearches.filter((q) => q !== query.trim())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    onSearch(1, query.trim(), type, year);
    setShowDropdown(false);
  };

  const handleSelectRecent = (val: string) => {
    setQuery(val);
    setShowDropdown(false);
  };

  const removeSearchItem = (itemToRemove: string) => {
    const updated = recentSearches.filter((item) => item !== itemToRemove);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-md px-4 py-4 md:px-6 md:py-5 shadow-lg border-b border-white/10">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between relative">
        {/* Search Input */}
        <div className="flex-1 min-w-[150px] relative w-full">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f1f1f] border border-gray-700 shadow-inner w-full">
            <IoSearch className="text-white text-lg" />
            <input
              type="text"
              aria-label="Search movies"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
              className="bg-transparent text-white outline-none w-full text-sm placeholder-gray-400 focus:ring-0"
            />
          </div>

          {/* Recent Searches Dropdown */}
       {showDropdown && recentSearches.length > 0 && (
  <div className="absolute top-full left-0 w-full mt-2 z-50">
    <div className="flex flex-wrap gap-2 bg-[#1f1f1f] border border-gray-700 rounded-full p-3 shadow-lg scrollbar-hide overflow-y-auto max-h-[160px]">
      {recentSearches.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center bg-gray-800 text-white text-sm px-4 py-1 rounded-full shadow-sm hover:bg-gray-700 transition"
        >
          <button
            onClick={() => handleSelectRecent(item)}
            className="truncate max-w-[120px] text-left"
            aria-label={`Search "${item}"`}
          >
            {item}
          </button>
          <button
            onClick={() => removeSearchItem(item)}
            className="ml-2 text-gray-400 hover:text-red-400"
            title="Remove"
            aria-label={`Remove "${item}" from recent searches`}
          >
            <IoClose className="text-sm" />
          </button>
        </div>
      ))}
    </div>
  </div>
)}

        </div>

        {/* 🔥 Mobile-Only Filter Toggle */}
        {!isDesktop && (
          <button
            className="flex items-center gap-2 md:hidden px-4 py-2 text-sm rounded-full bg-[#1f1f1f] text-white border border-gray-700 hover:border-blue-500 shadow-md"
            onClick={() => setShowFilters((prev) => !prev)}
            aria-label="Toggle filters"
          >
            <FiFilter className="text-lg" />
            <span>Filters</span>
          </button>
        )}

        {/* 🔽 Filter Section */}
        {(isDesktop || showFilters) && (
          <div className="flex flex-col md:flex-row gap-3  w-full md:w-auto">
           <div className="relative w-full md:w-auto">
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    aria-label="Filter by type"
    className="appearance-none w-full md:w-auto text-sm px-4 py-2 rounded-full bg-[#1f1f1f] text-white border border-gray-700 placeholder-gray-400 hover:border-blue-500 shadow-inner focus:outline-none pr-10"
  >
    <option value="">All Types</option>
    <option value="movie">Movie</option>
    <option value="series">Series</option>
  </select>

  {/* Custom dropdown arrow */}
  <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-white">
    ▼
  </div>
</div>


    <div className="relative w-full md:w-[120px]">
  <input
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    maxLength={4}
    value={year}
    onChange={(e) => {
      const input = e.target.value.replace(/\D/g, "").slice(0, 4);
      setYear(input);
      setShowYearSuggestions(!!input);
    }}
    onFocus={() => setShowYearSuggestions(true)}
    onBlur={() => setTimeout(() => setShowYearSuggestions(false), 100)} // Delay to allow click
    placeholder="Year"
    aria-label="Filter by year"
    className="w-full text-sm px-4 py-2 rounded-full bg-[#1f1f1f] text-white border border-gray-700 placeholder-gray-400 hover:border-blue-500 shadow-md focus:outline-none"
  />

  {/* Suggestions dropdown */}
  {showYearSuggestions && (
    <div className="absolute top-full left-0 w-full bg-[#1f1f1f] border border-gray-700 rounded-md mt-1 z-50 shadow-lg max-h-40 overflow-y-auto">
      {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((y) => (
        <button
          key={y}
          type="button"
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent input blur
            setYear(y.toString());
            setShowYearSuggestions(false);
          }}
          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
        >
          {y}
        </button>
      ))}
    </div>
  )}
</div>


            {/* Optional: Clear filters button */}
          
          </div>
        )}

        {/* Search Button */}
      <button
  onClick={handleSearchClick}
  className="w-full md:w-auto px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:scale-105 hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition-all duration-300"
  aria-label="Search"
>
   Search
</button>

      </div>
    </div>
  );
};

export default SearchBar;
