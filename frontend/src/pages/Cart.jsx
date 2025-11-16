// frontend/src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { getSavedListings, unsaveListing } from "../api";

const Cart = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load saved items from backend on mount
  useEffect(() => {
    const loadSaved = async () => {
      try {
        const items = await getSavedListings();
        setSavedItems(items || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load saved items.");
      } finally {
        setLoading(false);
      }
    };

    loadSaved();
  }, []);

  const totalPrice = savedItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0
  );

  const handleRemove = async (id) => {
    try {
      await unsaveListing(id);
      setSavedItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item. Please try again.");
    }
  };

  return (
    <PageContainer>
      <div 
        className="min-h-screen flex justify-center items-start"
        style={{ background: "white" }}
      >
        <div className="max-w-6xl w-full px-6 py-12">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-light text-black mb-1 tracking-wide">
                Saved Items
              </h1>
              <p className="text-sm text-gray-600 font-light">
                Your favorite finds in one place
              </p>
            </div>

            {!loading && savedItems.length > 0 && (
              <div className="bg-white border border-gray-200 text-right px-5 py-3">
                <p className="text-xs uppercase text-gray-500 font-light mb-1 tracking-wider">
                  Total Value
                </p>
                <p className="text-2xl font-light text-black mb-0.5">
                  ${totalPrice}
                </p>
                <p className="text-xs text-gray-500 font-light">
                  {savedItems.length} {savedItems.length === 1 ? "item" : "items"}
                </p>
              </div>
            )}
          </div>

          {/* Loading / Error States */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-base text-gray-500 font-light">Loading saved items...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-base text-red-500 font-light">{error}</p>
            </div>
          ) : savedItems.length > 0 ? (
            // Saved items list
            <div className="flex flex-col gap-6">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <Link
                      to={`/item/${item.id}`}
                      className="group relative overflow-hidden w-full md:w-56 h-56 bg-gray-100 flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>

                    {/* Right content */}
                    <div className="flex-1 p-6 flex flex-col gap-4">
                      {/* Title + Price */}
                      <div className="flex justify-between gap-6 items-start">
                        <Link
                          to={`/item/${item.id}`}
                          className="group flex-1"
                        >
                          <h2 className="text-xl font-light text-black group-hover:text-gray-600 transition-colors">
                            {item.title}
                          </h2>
                        </Link>
                        <p className="text-xl font-light text-black whitespace-nowrap">
                          ${item.price}
                        </p>
                      </div>

                      {/* Meta (category + location) */}
                      <div className="flex items-center gap-3 text-xs font-light">
                        <span className="bg-gray-100 text-black px-3 py-1 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-gray-600">
                          📍 {item.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-sm font-light leading-relaxed">
                        {item.description}
                      </p>

                      {/* Bottom row: actions */}
                      <div className="mt-auto pt-4 border-t border-gray-200 flex gap-3">
                        <Link
                          to={`/item/${item.id}`}
                          className="bg-black text-white px-5 py-2 font-light text-xs hover:bg-gray-800 transition-all tracking-wider"
                        >
                          Contact Seller
                        </Link>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="bg-white border border-gray-300 text-gray-700 px-5 py-2 font-light text-xs hover:bg-gray-100 transition-all tracking-wider"
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
            // Empty state - centered on page
            <div className="fixed inset-0 flex items-center justify-center" style={{ marginTop: '-64px' }}>
              <div className="text-center">
                <h2 className="text-3xl font-light text-black mb-3 tracking-wide">
                  No Saved Items Yet
                </h2>
                <p className="text-gray-600 font-light mb-8 text-base">
                  Start browsing and save items you're interested in!
                </p>
                <Link
                  to="/"
                  className="inline-block bg-black text-white px-8 py-3 font-light hover:bg-gray-800 transition-all"
                >
                  Browse Items
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Cart;