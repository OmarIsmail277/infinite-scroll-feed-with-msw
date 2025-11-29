import { useState } from "react";

interface SearchFilterProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
  currentCategory: string;
}

const SearchFilter = ({
  onSearchChange,
  onCategoryChange,
  categories,
  currentCategory,
}: SearchFilterProps) => {
  const [search, setSearch] = useState("");
  //   const [category, setCategory] = useState("all");
  const [inputValue, setInputValue] = useState("");

  const handleSearchSubmit = (value: string) => {
    // Only search if 3+ chars
    if (value.length >= 3 || value.length === 0) {
      setSearch(value);
      onSearchChange(value);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    // Auto-clear search if user deletes everything
    if (value.length === 0) {
      setSearch("");
      onSearchChange("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(inputValue);
    }
  };

  const handleSearchClick = () => {
    handleSearchSubmit(inputValue);
  };

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
  };

  const handleClear = () => {
    setSearch("");
    setInputValue("");
    onSearchChange("");
    onCategoryChange("all");
  };

  const isSearchActive = search.length > 0;
  const canSearch = inputValue.length >= 3;
  const showMinLengthWarning = inputValue.length > 0 && inputValue.length < 3;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products (min 3 characters)..."
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`w-full pl-10 pr-24 py-2 border rounded-lg outline-none transition-all ${
                showMinLengthWarning
                  ? "border-yellow-400 focus:ring-2 focus:ring-yellow-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              disabled={!canSearch}
              className={`absolute right-2 top-1.5 px-3 py-1 rounded text-sm font-medium transition-colors ${
                canSearch
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Search
            </button>
          </div>

          {/* Min length warning */}
          {showMinLengthWarning && (
            <p className="text-xs text-yellow-600 mt-1 ml-1">
              Type at least 3 characters to search
            </p>
          )}

          {/* Active search indicator */}
          {isSearchActive && (
            <p className="text-xs text-blue-600 mt-1 ml-1">
              Searching for: <span className="font-medium">"{search}"</span>
            </p>
          )}
        </div>

        {/* Category Filter */}
        <div className="md:w-64">
          <select
            value={currentCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(isSearchActive || currentCategory !== "all") && (
          <button
            onClick={handleClear}
            className="md:w-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
