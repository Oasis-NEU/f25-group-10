import React from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { currentUser, listings } from "../data/mockData";

const Cart = () => {
  const savedItems = listings.filter((item) =>
    currentUser.savedItems.includes(item.id)
  );
  const totalPrice = savedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <PageContainer className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-5 py-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              Saved Items
            </h1>
            <p className="text-lg text-gray-600">
              Your favorite finds in one place
            </p>
          </div>

          {savedItems.length > 0 && (
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center  min-w-[220px]">
              <p className="text-xs uppercase text-gray-500 font-semibold mb-1">
                Total Value
              </p>
              <p className="text-4xl font-bold text-teal-600">${totalPrice}</p>
              <p className="text-sm text-gray-500 mt-1">
                {savedItems.length} {savedItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          )}
        </div>

        {/* Items List */}
        {savedItems.length > 0 ? (
          <div className="flex flex-col gap-10">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <Link
                    to={`/item/${item.id}`}
                    className="group relative overflow-hidden w-full md:w-64 h-64 md:h-auto"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </Link>

                  {/* Content */}
                  <div className="flex-1 p-10 flex flex-col gap-6 max-w-4xl">
                    {/* Title + Price */}
                    <div className="flex justify-between gap-6">
                      <Link to={`/item/${item.id}`} className="group flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                          {item.title}
                        </h2>
                      </Link>

                      <p className="text-3xl font-bold text-teal-600 whitespace-nowrap mt-1">
                        ${item.price}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4">
                      <span className="bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                        {item.category}
                      </span>
                      <span className="text-gray-600 text-sm font-medium">
                        📍 {item.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-[1.05rem] leading-[1.65]">
                      {item.description}
                    </p>

                    {/* Bottom Section */}
                    <div className="mt-auto pt-6 border-t border-gray-200 flex items-center justify-between">
                      {/* Seller */}
                      <div className="flex items-center gap-4">
                        <img
                          src={item.seller.avatar}
                          alt={item.seller.name}
                          className="w-12 h-12 rounded-full ring-2 ring-gray-100"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">
                            {item.seller.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            ⭐ {item.seller.rating} rating
                          </p>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4">
                        <Link
                          to={`/item/${item.id}`}
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
                        >
                          Contact Seller
                        </Link>
                        <button
                          onClick={() => alert("Item removed")}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-md p-16 text-center">
            <p className="text-7xl mb-4 animate-pulse">❤️</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              No Saved Items Yet
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Start browsing and save items you're interested in!
            </p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-red-500 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
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
