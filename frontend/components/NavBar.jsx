import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <header className="bg-[#212D40] shadow-lg px-5">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-weight-800 text-[#e0d9c8] select-none ">FellowFinds</h1>
                  <nav className="flex items-center gap-6">
                    <Link to="/" className="nav-button">Home</Link>
                    <Link to="/explore" className="nav-button">Explore</Link>
                    <Link to="/search" className="nav-button">Search</Link>
                    <Link to="/profile" className="nav-button">Profile</Link>
                    <Link to="/shopping-cart" className="nav-button">Shopping Cart</Link>
                  </nav>
                </div>
              </header>
    )
}
/**
 * #AFBBF2
#DAD2BC
#5B647E
#364156
#212D40
#e0d9c8
#5b647e78
 */