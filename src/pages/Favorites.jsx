import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadFavs = () => {
      const favs = JSON.parse(localStorage.getItem("favorites")) || [];
      setMovies(favs);
    };
  
    loadFavs();
  
    window.addEventListener("storage", loadFavs);
  
    return () => window.removeEventListener("storage", loadFavs);
  }, []);

  return (
   <> <h1 style={{ textAlign: "center", marginTop: "20px",color:"white" }}>
  My Favorites ❤️
</h1>
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
      {movies.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
    </>
  );
}

export default Favorites;