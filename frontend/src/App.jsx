import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Followers from "./pages/followers";
import Following from "./pages/following";
import Profile from "./pages/profile";
import Search from "./pages/search";
import ShoppingCart from "./pages/shopping-cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
