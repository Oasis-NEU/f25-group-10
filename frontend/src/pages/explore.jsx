import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import ItemCard from '../components/features/ItemCard';
import { getListings, getCategories } from '../api';

const Explore = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [listingsData, categoriesData] = await Promise.all([
          getListings(),
          getCategories(),
        ]);

        setListings(listingsData || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Failed to load explore data', err);
        setError('Failed to load items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const locations = ['all', ...new Set(listings.map((item) => item.location))];

  const filteredListings =
    selectedLocation === 'all'
      ? listings
      : listings.filter((item) => item.location === selectedLocation);

  return (
    <PageContainer>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-2xl p-12 mb-12 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Explore Campus Marketplace</h1>
        <p className="text-xl opacity-90">
          Discover amazing deals from students across campus
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 text-center shadow-md">
          <div className="text-4xl font-bold text-[#4ECDC4] mb-2">
            {loading ? '—' : listings.length}
          </div>
          <div className="text-gray-600">Active Listings</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-md">
          <div className="text-4xl font-bold text-[#FF6B6B] mb-2">
            {loading ? '—' : categories.length}
          </div>
          <div className="text-gray-600">Categories</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-md">
          <div className="text-4xl font-bold text-[#0D1B2A] mb-2">
            {loading ? '—' : locations.length - 1}
          </div>
          <div className="text-gray-600">Campus Locations</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-md">
          <div className="text-4xl font-bold text-[#4ECDC4] mb-2">100%</div>
          <div className="text-gray-600">Student Verified</div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#0D1B2A] mb-6">Browse by Category</h2>
        {loading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const categoryCount = listings.filter(
                (item) => item.category === category.name
              ).length;
              return (
                <button
                  key={category.id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-[#0D1B2A] mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{categoryCount} items</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#0D1B2A]">All Items</h2>
        <div className="flex items-center gap-3">
          <label className="font-medium text-[#0D1B2A]">Filter by location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#4ECDC4]"
            disabled={loading}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <p className="text-gray-500">Loading items...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default Explore;
