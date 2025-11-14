import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { listings } from '../data/mockData';

const ItemDetail = () => {
  const { id } = useParams();
  const item = listings.find(listing => listing.id === parseInt(id));
  const [isSaved, setIsSaved] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  if (!item) {
    return (
      <PageContainer>
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-[#0D1B2A] mb-4">Item Not Found</h2>
          <Link to="/" className="text-[#4ECDC4] hover:underline">
            Return to Home
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#4ECDC4] hover:text-[#FF6B6B] mb-6 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Listings
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover"
              />
            </div>
            {item.featured && (
              <div className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white p-4 rounded-xl text-center font-semibold">
                ⭐ Featured Listing
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#4ECDC4]/20 text-[#0D1B2A] px-3 py-1 rounded-full text-sm font-semibold">
                  {item.category}
                </span>
                <span className="text-gray-500 text-sm">
                  Posted {new Date(item.postedDate).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-[#0D1B2A] mb-4">
                {item.title}
              </h1>
              <p className="text-5xl font-bold text-[#4ECDC4]">${item.price}</p>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg text-[#0D1B2A] mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Details */}
            <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
              <h3 className="font-semibold text-lg text-[#0D1B2A] mb-3">Item Details</h3>
              <div className="flex justify-between">
                <span className="text-gray-600">Condition:</span>
                <span className="font-semibold text-[#0D1B2A]">{item.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-semibold text-[#0D1B2A]">{item.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meet-up:</span>
                <span className="font-semibold text-[#0D1B2A]">On Campus</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg text-[#0D1B2A] mb-4">Seller Information</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.seller.avatar}
                  alt={item.seller.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-semibold text-lg text-[#0D1B2A]">{item.seller.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium text-gray-700">{item.seller.rating} rating</span>
                  </div>
                </div>
              </div>
              <Link
                to={`/profile/${item.seller.id}`}
                className="text-[#4ECDC4] hover:underline text-sm font-medium"
              >
                View seller profile →
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(true)}
                className="flex-1 bg-[#FF6B6B] text-white py-4 rounded-xl font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg"
              >
                Contact Seller
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`px-6 py-4 rounded-xl font-semibold transition-all shadow-lg ${
                  isSaved
                    ? 'bg-[#4ECDC4] text-white'
                    : 'bg-white text-[#4ECDC4] border-2 border-[#4ECDC4]'
                }`}
              >
                {isSaved ? '❤️ Saved' : '🤍 Save'}
              </button>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-[#0D1B2A] mb-4">
                Contact {item.seller.name}
              </h3>
              <p className="text-gray-600 mb-6">
                Send a message to inquire about this item. The seller will receive your university email.
              </p>
              <textarea
                placeholder="Hi! I'm interested in your item..."
                className="w-full border-2 border-gray-200 rounded-xl p-4 mb-4 focus:outline-none focus:border-[#4ECDC4] min-h-32"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Message sent! The seller will contact you via email.');
                    setShowContactModal(false);
                  }}
                  className="flex-1 bg-[#4ECDC4] text-white py-3 rounded-xl font-semibold hover:bg-[#4ECDC4]/90 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ItemDetail;