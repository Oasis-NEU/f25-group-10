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
import NavBar from '../components/NavBar';
// Import your main CSS file
import './App.css';


function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <NavBar/>

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