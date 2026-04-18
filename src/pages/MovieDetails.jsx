import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieDetails() {
  const { id } = useParams(); // URL se ID lena
  const [movie, setMovie] = useState(null);
  const[cast,setCast]=useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c9aba415cd7e3235d13762a8aa2a65a6`)
      .then(res => res.json())
      .then(data => setMovie(data))
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c9aba415cd7e3235d13762a8aa2a65a6`)
    .then(res => res.json())
    .then(data => {
      if (data && data.cast) {
        setCast(data.cast.slice(0, 5)); // top 5 actors
      }
    });

}, [id]);
  if (!movie) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <>
      {/* 🔥 Banner */}
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)"
          }}
        ></div>
  
        <h1
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            color: "white"
          }}
        >
          {movie.title}
        </h1>
      </div>
  
      {/* 🔥 Content */}
      <div style={{ padding: "20px", color: "white" }}>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          
          {/* 🎬 Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "250px", borderRadius: "10px" }}
          />
  
          {/* 📄 Details */}
          <div style={{ maxWidth: "600px" }}>
            
            <h3>⭐ Rating: {movie.vote_average || "N/A"}</h3>
  
            <p>📅 Release: {movie.release_date || "Unknown"}</p>
  
            <p>
              🎭 Genres:{" "}
              {movie.genres?.length
                ? movie.genres.map(g => g.name).join(", ")
                : "Not available"}
            </p>
  
            <p>
              👥 Cast:{" "}
              {cast.length
                ? cast.map(actor => actor.name).join(", ")
                : "Not available"}
            </p>
  
            <p style={{ marginTop: "10px" }}>
              {movie.overview || "No description available"}
            </p>
  
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;