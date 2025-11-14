import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { currentUser, listings } from '../data/mockData';

const Cart = () => {
  // Get saved items
  const savedItems = listings.filter(item => currentUser.savedItems.includes(item.id));

  // Calculate total if user wants to see combined price
  const totalPrice = savedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#0D1B2A] mb-2">Saved Items</h1>
            <p className="text-gray-600">Your favorite finds in one place</p>
          </div>
          {savedItems.length > 0 && (
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Total Value</div>
              <div className="text-3xl font-bold text-[#4ECDC4]">${totalPrice}</div>
            </div>
          )}
        </div>

        {savedItems.length > 0 ? (
          <div className="space-y-4">
            {savedItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex gap-6 p-6">
                  {/* Image */}
                  <Link to={`/item/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-40 h-40 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/item/${item.id}`}>
                        <h3 className="text-2xl font-bold text-[#0D1B2A] hover:text-[#4ECDC4] transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <span className="text-3xl font-bold text-[#4ECDC4]">${item.price}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#4ECDC4]/20 text-[#0D1B2A] px-3 py-1 rounded-full text-sm font-semibold">
                        {item.category}
                      </span>
                      <span className="text-gray-500 text-sm">📍 {item.location}</span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{item.description}</p>

                    {/* Seller Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={item.seller.avatar}
                        alt={item.seller.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-700">{item.seller.name}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-gray-600">{item.seller.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        to={`/item/${item.id}`}
                        className="flex-1 bg-[#FF6B6B] text-white py-2 px-4 rounded-lg font-semibold text-center hover:bg-[#FF6B6B]/90 transition-colors"
                      >
                        Contact Seller
                      </Link>
                      <button
                        onClick={() => alert('Item removed from saved items')}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center shadow-md">
            <div className="text-8xl mb-6">❤️</div>
            <h2 className="text-3xl font-bold text-[#0D1B2A] mb-4">No Saved Items Yet</h2>
            <p className="text-gray-600 text-lg mb-8">
              Start browsing and save items you're interested in!
            </p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              Browse Items
            </Link>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Cart;