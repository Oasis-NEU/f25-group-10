import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Followers from "./pages/followers";
import Following from "./pages/following";
import Profile from "./pages/profile";
import Search from "./pages/search";
import ShoppingCart from "./pages/shopping-cart";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", flexGrow: "1"}}>
        <Navbar /> {/* sidebar stays fixed on the left */}
        <main style={{marginLeft: "0px",
        padding: "1rem 2rem", 
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", }}>
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
    </Router>
  );
}

export default App;
