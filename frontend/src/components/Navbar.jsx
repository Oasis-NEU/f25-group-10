import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/followers", label: "Followers" },
    { to: "/following", label: "Following" },
    { to: "/profile", label: "Profile" },
    { to: "/search", label: "Search" },
    { to: "/shopping-cart", label: "Cart" },
  ];

  return (
    <nav
      style={{
        background: "#1e5f74",
        color: "#fff",
        width: "220px",
        height: "100vh", // full height of viewport
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "2rem 1rem",
        gap: "1rem",
      }}
    >
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          style={{
            color: location.pathname === link.to ? "#fff" : "#d0e6f5",
            textDecoration: "none",
            fontWeight: location.pathname === link.to ? "bold" : "normal",
            fontSize: "1.1rem",
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
