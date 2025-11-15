import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Link 
      to={`/item/${item.id}`} 
      className="block w-full group"
    >
      <div className="bg-white overflow-hidden">
        {/* Image with heart button */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          
          {/* Heart icon - toggles saved state */}
          <button 
            className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 hover:scale-110 transition-all duration-200"
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            style={{
              boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
            }}
          >
            <svg 
              className="w-6 h-6 transition-colors duration-200" 
              fill={isSaved ? '#FF6B9D' : 'none'} 
              stroke={isSaved ? '#FF6B9D' : 'currentColor'}
              style={{ color: isSaved ? '#FF6B9D' : '#374151' }}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Info - Simple text below image */}
        <div className="p-4 bg-white">
          <h3 className="text-gray-800 mb-2 line-clamp-2 text-sm font-light leading-relaxed">
            {item.title}
          </h3>
          <p 
            className="text-gray-900 font-normal tracking-wide"
            style={{
              fontSize: '14px',
              letterSpacing: '0.05em'
            }}
          >
            ${item.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;