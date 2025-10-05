import React, { useState } from "react";

const mockResults = [
  { id: 1, title: "Desk Chair", price: "$15", location: "3 miles away" },
  { id: 2, title: "Board Games", price: "$10", location: "2 miles away" }
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = e => {
    e.preventDefault();
    setResults(query ? mockResults : []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 to-yellow-100 font-sans text-blue-900 p-8">
      <h2 className="text-3xl font-bold mb-8 drop-shadow-lg">Search Local Items</h2>
      <form onSubmit={handleSearch} className="bg-white/80 rounded-2xl shadow-lg p-6 max-w-md mx-auto mb-8 flex gap-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for items..."
          className="flex-1 p-3 rounded-xl border-none text-lg shadow-md focus:outline-none"
        />
        <button type="submit" className="bg-gradient-to-r from-cyan-200 to-yellow-100 rounded-xl px-6 py-3 font-bold text-blue-900 shadow-md hover:from-yellow-100 hover:to-cyan-200 transition-colors">
          Search
        </button>
      </form>
      <div className="flex flex-wrap gap-8 justify-center">
        {results.map(item => (
          <div key={item.id} className="bg-white/80 rounded-3xl shadow-lg p-6 w-56 text-center">
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-blue-700 mb-1">{item.price}</p>
            <span className="text-base text-blue-900">{item.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
