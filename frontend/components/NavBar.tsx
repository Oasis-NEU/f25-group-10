import { Link } from "react-router-dom"

export default function NavBar() {
    return (
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
    )
}