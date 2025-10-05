import React from "react";

const user = {
  name: "Alex Rivera",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  location: "Boston, MA",
  listings: [
    { id: 1, title: "Bookshelf", price: "$40" },
    { id: 2, title: "Coffee Table", price: "$25" }
  ]
};

const Profile = () => (
  <div className="font-sans text-blue-900 flex flex-col items-center p-8">
    <div className="frutiger-panel p-8 text-center max-w-sm mb-8 w-full">
      <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full mb-4 shadow-md mx-auto" />
      <h2 className="font-bold text-2xl mb-2 text-white">{user.name}</h2>
      <p className="text-gray-200 mb-4">{user.location}</p>
      <div className="flex justify-center gap-4 mb-2">
        <a href="/followers" className="text-gray-100 underline">Followers</a>
        <a href="/following" className="text-gray-100 underline">Following</a>
      </div>
    </div>
    <div className="frutiger-panel p-6 max-w-sm w-full">
      <h3 className="font-bold text-lg mb-4 text-white">My Listings</h3>
      <ul className="list-none p-0">
        {user.listings.map(item => (
          <li key={item.id} className="bg-white/20 rounded-xl mb-4 p-4 shadow-md flex justify-between items-center">
            <span className="font-bold text-white">{item.title}</span>
            <span className="text-gray-200">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Profile;
