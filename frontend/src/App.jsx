import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import all your page components
import Home from './pages/home';
import Explore from './pages/explore';
import Followers from './pages/followers';
import Following from './pages/following';
import Profile from './pages/profile';
import Search from './pages/search';
import ShoppingCart from './pages/shopping-cart';

// Import your main CSS file
import './App.css';

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <header className="frutiger-panel m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">FellowFinds</h1>
          <nav className="flex items-center gap-6">
            <Link to="/" className="sidebar-button">Home</Link>
            <Link to="/explore" className="sidebar-button">Explore</Link>
            <Link to="/search" className="sidebar-button">Search</Link>
            <Link to="/profile" className="sidebar-button">Profile</Link>
            <Link to="/shopping-cart" className="frutiger-button px-4 py-2">Shopping Cart</Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;