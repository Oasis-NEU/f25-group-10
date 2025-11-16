import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/shared/NavBar';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Explore from './pages/explore';
import PostItem from './pages/PostItem';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/post-item" element={<PostItem />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;