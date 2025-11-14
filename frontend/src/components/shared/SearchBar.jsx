import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className="w-5 h-5 transition-colors duration-300" 
            style={{ color: isFocused ? '#00AEEF' : '#9CA3AF' }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for textbooks, furniture, electronics..."
          className="w-full border-2 rounded-full px-6 pl-14 py-3.5 focus:outline-none transition-all duration-300 tracking-wide"
          style={{
            borderColor: isFocused ? '#00AEEF' : '#E5E7EB',
            boxShadow: isFocused ? '0 0 0 4px rgba(0, 174, 239, 0.15), 0 4px 20px rgba(0, 174, 239, 0.2)' : 'none',
            background: 'white'
          }}
        />
        
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2.5 rounded-full transition-all duration-300 transform hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #00AEEF 0%, #4ECDC4 100%)',
            boxShadow: '0 4px 12px rgba(0, 174, 239, 0.3)'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;