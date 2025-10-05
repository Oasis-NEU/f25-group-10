import React from 'react';

// Sample data for the items
const recommendedItems = [
  { id: 1, name: 'Vintage Lamp', image: 'https://images.unsplash.com/photo-1589584693689-0663b88b7f3b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { id: 2, name: 'Mountain Bike', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { id: 3, name: 'Leather Chair', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
  { id: 4, name: 'House Plant', image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
];

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="frutiger-panel p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-shadow-lg">Recommended for Today</h2>
        <div className="grid grid-cols-4 gap-8">
          {recommendedItems.map((item) => (
            <div key={item.id} className="bg-white/20 rounded-xl overflow-hidden group shadow-lg flex flex-col">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-white">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;