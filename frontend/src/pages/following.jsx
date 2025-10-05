import React from "react";

const following = [
  { id: 1, name: "Morgan Lee", avatar: "https://randomuser.me/api/portraits/women/46.jpg" },
  { id: 2, name: "Taylor Kim", avatar: "https://randomuser.me/api/portraits/men/47.jpg" }
];

const Following = () => (
  <div className="min-h-screen bg-gradient-to-br from-cyan-200 to-yellow-100 font-sans text-blue-900 p-8">
    <h2 className="text-3xl font-bold mb-8 drop-shadow-lg">Following</h2>
    <div className="flex flex-wrap gap-8 justify-center">
      {following.map(f => (
        <div key={f.id} className="bg-white/80 rounded-3xl shadow-lg p-6 w-56 text-center">
          <img src={f.avatar} alt={f.name} className="w-20 h-20 rounded-full mb-4 shadow-md mx-auto" />
          <h3 className="font-bold text-lg">{f.name}</h3>
        </div>
      ))}
    </div>
  </div>
);

export default Following;
