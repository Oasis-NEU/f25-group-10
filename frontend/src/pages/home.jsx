import React, { useState, useEffect } from 'react';
import ItemCard from '../components/features/ItemCard';
import { getListings } from '../api';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('recent');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getListings();
        setListings(data || []);
      } catch (err) {
        console.error('Failed to load listings', err);
        setError('Failed to load items. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, []);

  const filteredListings = listings
    .filter(item => !selectedCategory || item.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'recent') return new Date(b.postedDate) - new Date(a.postedDate);
      return 0;
    });

  return (
    <div
      className="min-h-screen flex justify-center"
      style={{
        background: '#e9f2f9ff',
      }}
    >
      <div className="w-full max-w-[1400px] px-6 py-8">
        {/* Filters Bar */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-700 text-base font-semibold tracking-wide">
            {loading
              ? 'LOADING ITEMS...'
              : `${filteredListings.length} ${
                  filteredListings.length === 1 ? 'ITEM' : 'ITEMS'
                }`}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-gray-300 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide focus:outline-none bg-white transition-all duration-300"
            style={{
              borderColor: '#E5E7EB',
            }}
          >
            <option value="recent">MOST RECENT</option>
            <option value="price-low">PRICE: LOW TO HIGH</option>
            <option value="price-high">PRICE: HIGH TO LOW</option>
          </select>
        </div>

        {/* Items Grid */}
        <div
          className="rounded-3xl p-8"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 font-semibold tracking-wide">
                LOADING ITEMS...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-red-500 font-semibold tracking-wide">
                {error}
              </p>
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {filteredListings.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 font-semibold tracking-wide">
                NO ITEMS FOUND. TRY ADJUSTING YOUR FILTERS!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
