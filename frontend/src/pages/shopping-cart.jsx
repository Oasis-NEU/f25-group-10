import React from "react";

const cartItems = [
  { id: 1, title: "Desk Chair", price: "$15" },
  { id: 2, title: "Board Games", price: "$10" }
];

const ShoppingCart = () => (
  <div className="min-h-screen bg-gradient-to-br from-cyan-200 to-yellow-100 font-sans text-blue-900 p-8">
    <h2 className="text-3xl font-bold mb-8 drop-shadow-lg">Shopping Cart</h2>
    <div className="flex flex-wrap gap-8 justify-center">
      {cartItems.map(item => (
        <div key={item.id} className="bg-white/80 rounded-3xl shadow-lg p-6 w-56 text-center">
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-blue-700 mb-1">{item.price}</p>
        </div>
      ))}
    </div>
    <div className="text-center mt-8">
      <button className="bg-gradient-to-r from-cyan-200 to-yellow-100 rounded-2xl px-8 py-4 font-bold text-blue-900 shadow-md text-lg hover:from-yellow-100 hover:to-cyan-200 transition-colors">
        Checkout
      </button>
    </div>
  </div>
);

export default ShoppingCart;
