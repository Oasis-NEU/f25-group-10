import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['FURNITURE', 'ELECTRONICS', 'TEXTBOOKS', 'CLOTHING', 'SPORTS', 'KITCHEN', 'DECOR', 'OTHER'];

  return (
    <nav 
      className="sticky top-0 z-50"
      style={{
        background: 'white',
        borderBottom: '1px solid #E5E7EB'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Top Row */}
        <div className="h-16 flex items-center justify-between">
          {/* Left - Search */}
          <button className="flex items-center gap-2 text-sm font-medium text-black hover:text-[#00AEEF] transition-colors">
            Search
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-[0.3em] text-black" style={{ letterSpacing: '0.3em' }}>
                FELLOW FINDS
              </h1>
            </div>
          </Link>

          {/* Right - Icons */}
          <div className="flex items-center gap-5">


            <Link to="/profile" className="hover:text-[#00AEEF] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <Link to="/cart" className="hover:text-[#00AEEF] transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#00AEEF] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
            </Link>
          </div>
        </div>

        {/* Bottom Row - Categories */}
        <div className="flex items-center justify-center gap-8 h-12 border-t border-gray-100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="relative text-sm font-medium text-black hover:text-[#00AEEF] transition-colors tracking-wide"
            >
              {category}
              {selectedCategory === category && (
                <div 
                  className="absolute -bottom-3 left-0 right-0 h-0.5"
                  style={{ background: '#00AEEF' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;