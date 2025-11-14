import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/item/${item.id}`} 
      className="block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="bg-white overflow-hidden transition-all duration-300"
        style={{
          boxShadow: isHovered 
            ? '0 12px 30px rgba(0, 174, 239, 0.25), 0 0 0 1px rgba(0, 174, 239, 0.1)' 
            : '0 4px 15px rgba(0, 0, 0, 0.08)',
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
        }}
      >
        {/* Image with overlay */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.08)' : 'scale(1)'
            }}
          />
          
          {/* Gradient overlay on hover */}
          <div 
            className="absolute inset-0 transition-opacity duration-300 flex items-end justify-between p-4"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
              opacity: isHovered ? 1 : 0
            }}
          >
            <div className="text-white">
              <p className="font-bold text-3xl tracking-wider">${item.price}</p>
            </div>
            <button 
              className="backdrop-blur-sm p-2.5 hover:scale-110 transition-all"
              onClick={(e) => {
                e.preventDefault();
                alert('Added to saved items!');
              }}
              style={{
                background: '#e9f2f9ff'
              }}
            >
              <svg className="w-5 h-5 text-[#FF6F61]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Heart icon when not hovering */}
          {!isHovered && (
            <button 
              className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 hover:bg-white hover:scale-110 transition-all"
              onClick={(e) => {
                e.preventDefault();
                alert('Added to saved items!');
              }}
              style={{
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
        </div>

        {/* Info - hidden on hover - Minimal Black Text */}
        <div 
          className="p-3 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0 : 1
          }}
        >
          <h3 className="text-black mb-0.5 line-clamp-1 text-sm font-normal">
            {item.title}
          </h3>
          <p className="text-black text-xs font-light mb-1">{item.category}</p>
          <p className="text-black font-bold text-base">
            ${item.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
