import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import ItemCard from "../components/features/ItemCard";
import CategoryFilter from "../components/features/CategoryFilter";
import { getListings, getCategories } from "../api";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync query from URL
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Load categories once
  useEffect(() => {
    const loadCats = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadCats();
  }, []);

  // Map price range to API params
  const getPriceParams = () => {
    if (priceRange === "under50") return { minPrice: 0, maxPrice: 50 };
    if (priceRange === "50to100") return { minPrice: 50, maxPrice: 100 };
    if (priceRange === "over100") return { minPrice: 100, maxPrice: null };
    return {};
  };

  // Fetch results anytime filters change
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const priceParams = getPriceParams();

        const data = await getListings({
          q: query || null,
          category: selectedCategory || null,
          sortBy,
          ...priceParams,
        });

        setResults(data || []);
      } catch (err) {
        console.error("Search failed", err);
        setError("Failed to load items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, selectedCategory, priceRange, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) setSearchParams({ q: query });
    else setSearchParams({});
  };

  return (
    <PageContainer>
      <div
        className="min-h-screen flex justify-center"
        style={{
  background: "linear-gradient(135deg, #e8a4a4ff 0%, #c88282ff 50%, #7e3939ff 100%)"
}}
      >
        <div className="max-w-6xl w-full px-6 py-12">
          {/* Search Header */}
          <div className="mb-16 text-center">
            <h1 className="text-2xl font-light text-black mb-6 tracking-wide">
              Search Items
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-3 bg-white border border-gray-300">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for textbooks, furniture, electronics..."
                  className="flex-1 px-6 py-4 focus:outline-none text-gray-700 font-light text-sm"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-4 font-light text-sm hover:bg-gray-800 transition-all tracking-wide"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Results Count */}
            {query && !loading && (
              <p className="text-gray-600 font-light text-sm">
                Found{" "}
                <span className="font-normal text-black">{results.length}</span>{" "}
                results for "{query}"
              </p>
            )}
          </div>

          {/* Categories */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          {/* Filters & Sort */}
          <div className="flex flex-wrap gap-6 mb-12 items-center justify-center">
            <div className="flex items-center gap-3">
              <label className="font-light text-gray-600 text-sm">Price:</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-white border border-gray-300 px-4 py-2 focus:outline-none focus:border-black font-light text-sm"
              >
                <option value="all">All Prices</option>
                <option value="under50">Under $50</option>
                <option value="50to100">$50 - $100</option>
                <option value="over100">Over $100</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="font-light text-gray-600 text-sm">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 px-4 py-2 focus:outline-none focus:border-black font-light text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {(selectedCategory || priceRange !== "all" || query) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setPriceRange("all");
                  setQuery("");
                  setSearchParams({});
                }}
                className="text-black hover:underline font-light text-sm"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading results...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {results.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-12 text-center">
              <h3 className="text-xl font-light text-black mb-3 tracking-wide">
                No Results Found
              </h3>
              <p className="text-gray-600 font-light mb-8 text-sm">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setPriceRange("all");
                  setQuery("");
                  setSearchParams({});
                }}
                className="bg-black text-white px-6 py-3 font-light text-sm hover:bg-gray-800 transition-colors tracking-wide"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Search;
