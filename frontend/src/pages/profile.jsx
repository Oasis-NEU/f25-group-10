import React, { useState } from 'react';
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
      className="min-h-screen flex justify-center py-12"
      style={{
        background: 'linear-gradient(135deg, #E3F2FD 0%, #FFE5E5 50%, #E0F7FA 100%)'
      }}
    >
      <div className="w-full max-w-4xl px-6">
        {/* Profile Header - Centered */}
        <div className="flex flex-col items-center mb-8">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-gray-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>

          {/* Username */}
          <h1 className="text-3xl font-bold text-black mb-2">
            {currentUser.name.toLowerCase().replace(' ', '')}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-black" fill={star <= Math.floor(currentUser.rating) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
            <span className="ml-1 text-black">(0)</span>
          </div>

          {/* Status */}
          <p className="text-gray-600 text-sm mb-6">Active today</p>

          {/* Followers/Following */}
          <div className="flex items-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">0</div>
              <div className="text-sm text-black">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">0</div>
              <div className="text-sm text-black">Following</div>
            </div>
          </div>

          {/* Shop Name */}
          <h2 className="text-xl font-bold text-black mb-6">
            {currentUser.name.toLowerCase()}'s shop
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-12 mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('selling')}
            className={`pb-3 text-base font-semibold transition-all ${
              activeTab === 'selling'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500'
            }`}
          >
            Selling
          </button>
          <button
            onClick={() => setActiveTab('likes')}
            className={`pb-3 text-base font-semibold transition-all ${
              activeTab === 'likes'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500'
            }`}
          >
            Likes
          </button>
          <button
            onClick={() => setActiveTab('saves')}
            className={`pb-3 text-base font-semibold transition-all ${
              activeTab === 'saves'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500'
            }`}
          >
            Saves
          </button>
        </div>

        {/* Items Grid */}
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              {activeTab === 'selling' ? 'No items for sale yet' : 'No saved items yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;