import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsExpanded(false);
      setQuery('');
    }
  };

  const handleSearchClick = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className="h-16 flex items-center justify-between gap-8">
          {/* Left - Search */}
          <div className="flex-1" ref={searchRef}>
            {!isExpanded ? (
              <button 
                onClick={handleSearchClick}
                className="flex items-center gap-2 text-sm font-medium text-black hover:text-[#00AEEF] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg 
                      className="w-5 h-5 text-[#00AEEF]"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search items..."
                    className="w-full border-2 rounded-full pl-12 pr-4 py-2.5 text-sm focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: '#00AEEF',
                      boxShadow: '0 0 0 3px rgba(0, 174, 239, 0.1)',
                      background: 'white'
                    }}
                  />
                </div>
              </form>
            )}
          </div>

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
      </div>
    </nav>
  );
};

export default NavBar;