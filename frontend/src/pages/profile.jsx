import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/features/ItemCard';
import { currentUser, listings } from '../data/mockData';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('selling');

  // Get user's listings
  const myListings = listings.filter(item => currentUser.myListings.includes(item.id));
  
  // Get saved items
  const savedItems = listings.filter(item => currentUser.savedItems.includes(item.id));

  const displayItems = activeTab === 'selling' ? myListings : savedItems;

  return (
    <div 
      className="min-h-screen flex justify-center items-start"
      style={{
        background: 'white'
      }}
    >
      <div className="max-w-4xl w-full px-6 py-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-16 space-y-8">
          {/* Avatar */}
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-600 text-4xl font-light">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>

          {/* Username */}
          <h1 className="text-3xl font-light text-black">
            {currentUser.name.toLowerCase().replace(' ', '')}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className="w-5 h-5 text-black" 
                fill={star <= Math.floor(currentUser.rating) ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
            <span className="ml-2 text-black font-light">(0)</span>
          </div>

          {/* Status */}
          <p className="text-gray-500 text-sm font-light">Active today</p>

          {/* Stats */}
          <div className="flex items-center gap-16">
            <div className="text-center">
              <div className="text-2xl font-light text-black">0</div>
              <div className="text-sm text-gray-600 font-light">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-black">0</div>
              <div className="text-sm text-gray-600 font-light">Following</div>
            </div>
          </div>

          {/* Shop Name */}
          <h2 className="text-xl font-light text-black pt-4">
            {currentUser.name.toLowerCase()}'s shop
          </h2>

          {/* Post Item Button */}
          <Link
            to="/post-item"
            className="bg-black text-white px-8 py-3 font-light text-base hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Item
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-16 mb-12 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('selling')}
            className={`pb-4 text-base font-light transition-all ${
              activeTab === 'selling'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-400'
            }`}
          >
            Selling
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-4 text-base font-light transition-all ${
              activeTab === 'saved'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-400'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Items Grid */}
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 font-light">
              {activeTab === 'selling' ? 'No items for sale yet' : 'No saved items yet'}
            </p>
            {activeTab === 'selling' && (
              <Link
                to="/post-item"
                className="inline-block mt-6 text-black hover:underline font-light"
              >
                Post your first item →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;