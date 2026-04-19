import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTop: "5px solid #e50914",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "40px auto"
  };

  useEffect(() => {
    const url = debouncedQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedQuery}&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

    setLoading(true);
    setError(false);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        if (data.results) {
          if (page === 1) {
            setMovies(data.results);
          } else {
            setMovies(prev => [...prev, ...data.results]);
          }
        }

        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

  }, [debouncedQuery, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100;

      if (bottom && !loading) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <>
      <h1 style={{
        textAlign: "center",
        marginTop: "20px",
        color: "white",
        fontSize: "32px"
      }}>
        Popular Movies 🎬
      </h1>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "12px",
          margin: "20px auto",
          width: "320px",
          display: "block",
          borderRadius: "20px",
          border: "none",
          backgroundColor: "#222",
          color: "white"
        }}
      />

      {/* 🔥 RESPONSIVE GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
          padding: "20px"
        }}
      >
        {loading && page === 1 ? (
          <div style={spinnerStyle}></div>
        ) : error ? (
          <p style={{ color: "red" }}>Something went wrong ❌</p>
        ) : movies.length === 0 ? (
          <p style={{ color: "white" }}>No movies found 🎬</p>
        ) : (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>

      {loading && page > 1 && <div style={spinnerStyle}></div>}
    </>
  );
}

export default Home;