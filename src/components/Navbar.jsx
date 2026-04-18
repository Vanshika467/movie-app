import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#000",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
      }}
    >
    
    <h2 
  style={{ 
    margin: 0, 
    color: "white",   // 🔥 MUST ADD
    fontWeight: "bold"
  }}
>
  🎬 MovieHub
</h2>

 
      <div>
        <Link
          to="/"
          style={{
            margin: "0 15px",
            color: location.pathname === "/" ? "#facc15" : "white",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Home
        </Link>

        <Link
          to="/favorites"
          style={{
            margin: "0 15px",
            color: location.pathname === "/favorites" ? "#facc15" : "white",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Favorites ❤️
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;