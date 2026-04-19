import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieCard({ movie }) {
  const [isFav, setIsFav] = useState(false);


  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favs.some(item => item.id === movie.id);
    setIsFav(exists);
  }, [movie.id]);

  const handleFav = () => {
    setIsFav(prev => !prev);
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favs.some(item => item.id === movie.id);

    if (exists) {
      favs = favs.filter(item => item.id !== movie.id);
      setIsFav(false);
    } else {
      favs.push(movie);
      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
  };

  return (
    <div
    style={{
      width: "100%",
        maxWidth: "180px",
      margin: "15px",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: "#111",
      borderRadius: "10px",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
      <Link to={`/movie/${movie.id}`}
       style={{ textDecoration: "none", color: "white" }}>
      <img
  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  alt={movie.title}
  style={{
    width: "100%",
    height: "300px",
    objectFit: "cover"
  }}
/>
<h3 style={{ color: "white", padding: "10px", fontSize: "16px" }}>
  {movie.title}
</h3>
      </Link>

      <button
  onClick={handleFav}
  style={{
    marginBottom: "10px",
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  }}
>
  {isFav ? "❤️" : "🤍"}
</button>
    </div>
  );
}

export default MovieCard;