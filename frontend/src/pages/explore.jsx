import React from "react";

const listings = [
  { id: 1, title: "Vintage Lamp", price: "$20", location: "2 miles away", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "Mountain Bike", price: "$120", location: "5 miles away", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "Cookware Set", price: "$35", location: "1 mile away", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 4, title: "Desk Chair", price: "$15", location: "3 miles away", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: 5, title: "Board Games", price: "$10", location: "2 miles away", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 6, title: "Bookshelf", price: "$40", location: "4 miles away", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 7, title: "Coffee Table", price: "$25", location: "1 mile away", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: 8, title: "Cookware Set", price: "$35", location: "1 mile away", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
];

const Explore = () => (
  <div className="container mx-auto">
    <div className="frutiger-panel p-6">
      <h2 className="text-3xl font-bold text-white mb-8 text-shadow-lg text-center">Explore Local Finds</h2>
      <div className="grid grid-cols-4 gap-8">
        {listings.map(item => (
          <div key={item.id} className="bg-white/20 rounded-xl overflow-hidden group shadow-lg text-center flex flex-col">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
              </div>
              <div>
                <p className="text-gray-200 mb-1">{item.price}</p>
                <span className="text-sm text-gray-300">{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Explore;
