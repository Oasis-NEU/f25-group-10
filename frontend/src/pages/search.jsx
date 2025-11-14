import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import ItemCard from '../components/features/ItemCard';
import CategoryFilter from '../components/features/CategoryFilter';
import { listings, categories } from '../data/mockData';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Update query from URL params
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Filter and sort results
  const searchResults = listings
    .filter(item => {
      // Search query filter
      const matchesQuery = query === '' || 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());

      // Category filter
      const matchesCategory = !selectedCategory || item.category === selectedCategory;

      // Price range filter
      let matchesPrice = true;
      if (priceRange === 'under50') matchesPrice = item.price < 50;
      if (priceRange === '50to100') matchesPrice = item.price >= 50 && item.price <= 100;
      if (priceRange === 'over100') matchesPrice = item.price > 100;

      return matchesQuery && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'recent') return new Date(b.postedDate) - new Date(a.postedDate);
      return 0;
    });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <PageContainer>
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0D1B2A] mb-6">Search Items</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3 bg-white rounded-full shadow-lg p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for textbooks, furniture, electronics..."
              className="flex-1 px-6 py-3 rounded-full focus:outline-none text-gray-700"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results Count */}
        {query && (
          <p className="text-gray-600">
            Found <span className="font-bold text-[#0D1B2A]">{searchResults.length}</span> results for "{query}"
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
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        <div className="flex items-center gap-2">
          <label className="font-medium text-[#0D1B2A]">Price:</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4ECDC4]"
          >
            <option value="all">All Prices</option>
            <option value="under50">Under $50</option>
            <option value="50to100">$50 - $100</option>
            <option value="over100">Over $100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium text-[#0D1B2A]">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4ECDC4]"
          >
            <option value="recent">Most Recent</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(selectedCategory || priceRange !== 'all' || query) && (
          <button
            onClick={() => {
              setSelectedCategory(null);
              setPriceRange('all');
              setQuery('');
              setSearchParams({});
            }}
            className="ml-auto text-[#FF6B6B] hover:underline font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Results Grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center shadow-md">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2">No Results Found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setPriceRange('all');
              setQuery('');
              setSearchParams({});
            }}
            className="bg-[#4ECDC4] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4ECDC4]/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </PageContainer>
  );
};

export default Search;