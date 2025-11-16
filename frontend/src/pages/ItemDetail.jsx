import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { getListingById } from '../api';
import PFP from '../assets/angel-pfp.jpg';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getListingById(id);
        setItem(data);
      } catch (err) {
        console.error('Failed to load item', err);
        setError('Item not found');
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  const handleAddToBag = () => {
    setIsSaved(true);
    alert('Item added to your saved items!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#e0bebeff' }}>
        <div className="text-center py-20">
          <h2 className="text-2xl font-light text-black">Loading item...</h2>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#e0bebeff' }}>
        <div className="text-center py-20">
          <h2 className="text-3xl font-light text-black mb-4">Item Not Found</h2>
          <Link to="/" className="text-black hover:underline font-light">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Mock seller data if not provided by API
  const seller = item.seller || {
    id: 1,
    name: 'Angel El Moucary',
    avatar: PFP,
    rating: 4.8,
    email: 'elmoucary.a@university.edu'
  };

  return (
    <div className="min-h-screen" style={{ background: '#e0bebeff' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-black hover:text-gray-600 mb-8 font-light transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Listings
        </Link>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="relative">
            <div className="bg-white overflow-hidden shadow-lg sticky top-24">
              <div className="aspect-square">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {item.featured && (
                <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 text-sm font-light shadow-lg">
                  Featured
                </div>
              )}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 hover:scale-110 transition-all duration-200 shadow-lg"
              >
                <svg
                  className="w-6 h-6 transition-colors duration-200"
                  fill={isSaved ? '#FF6B9D' : 'none'}
                  stroke={isSaved ? '#FF6B9D' : 'currentColor'}
                  style={{ color: isSaved ? '#FF6B9D' : '#374151' }}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-8 py-8">
            {/* Category & Date */}
            <div className="flex items-center gap-3">
              <span className="bg-[#e0bebeff] text-black px-4 py-1.5 text-sm font-light">
                {item.category}
              </span>
              <span className="text-gray-500 text-sm font-light">
                Posted{' '}
                {item.postedDate
                  ? new Date(item.postedDate).toLocaleDateString()
                  : ''}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-light text-black leading-tight">
              {item.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-light text-black">
                ${item.price}
              </span>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-normal text-black mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-base font-light">
                {item.description}
              </p>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddToBag}
              className="w-full bg-[#8B0000] text-white py-4 font-light text-lg hover:bg-[#660000] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Add to Bag
            </button>

            {/* Item Details */}
            <div className="bg-[#e0bebeff] p-6 space-y-5">
              <h3 className="font-normal text-lg text-black mb-6">
                Item Details
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Condition:</span>
                  <span className="font-normal text-black">
                    {item.condition}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Location:</span>
                  <span className="font-normal text-black">
                    📍 {item.location}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Meet-up:</span>
                  <span className="font-normal text-black">On Campus</span>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-[#e0bebeff]">
              <h3 className="font-normal text-lg text-black mb-4">
                Seller Information
              </h3>

              <div className="flex items-center gap-4">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-12 h-12 border-2 border-gray-200"
                />
                <div>
                  <button
                    onClick={() => setShowSellerModal(true)}
                    className="text-black font-normal hover:underline text-left"
                  >
                    {seller.name}
                  </button>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="font-light text-gray-700 text-sm">
                      {seller.rating} rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Modal */}
        {showSellerModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSellerModal(false)}
          >
            <div
              className="bg-white p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-normal text-black">
                  Seller Details
                </h3>
                <button
                  onClick={() => setShowSellerModal(false)}
                  className="text-gray-400 hover:text-black"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-20 h-20 border-2 border-gray-200"
                />
                <div>
                  <p className="text-xl font-normal text-black mb-1">
                    {seller.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-light text-gray-700">
                      {seller.rating} rating
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50">
                  <p className="text-sm font-light text-gray-600 mb-2">
                    Email:
                  </p>
                  <a
                    href={`mailto:${seller.email}`}
                    className="text-black font-normal hover:underline break-all"
                  >
                    {seller.email}
                  </a>
                </div>

                <Link
                  to={`/profile/${seller.id}`}
                  className="block w-full bg-black text-white py-3 text-center font-light hover:bg-gray-800 transition-colors"
                  onClick={() => setShowSellerModal(false)}
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;