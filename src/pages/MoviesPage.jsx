import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RedirectButton } from "../components/RedirectButtonComponent";
import { useMovies } from "../context/MoviesContext";
import "./MoviesPage.css";

export function MoviesPage() {
  const { getMovies, movies } = useMovies();
  const [search, setSearch] = useState("");
  const [staticMovies, setStaticMovies] = useState(null);
  const URL = `${import.meta.env.VITE_STATIC_URL}/static/peliculas/`;

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    setStaticMovies(movies);
    if (search.length === 0) {
      return;
    }
    console.log("staticMovies", staticMovies);
  }, [search]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className="movies-page">
      <div className="movies-header">
        <div className="input-container">
          <span className="search-icon">🔍</span>
          <input
            onChange={handleOnChange}
            type="text"
            placeholder="Title, people, genre..."
          />
        </div>
        <RedirectButton buttonText="Add new movie" route="/movies-form" />
      </div>

      {movies.length === 0 ? (
        <p>No hay películas disponibles.</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/watch/${encodeURIComponent(movie.title)}`}
              className="movie-card"
            >
              {!movie.id ? (
                <div className="favorite-icon">
                  <span>⭐</span>
                </div>
              ) : (
                ""
              )}
              <div className="movie-banner-wrapper">
                {movie.title ? (
                  <img
                    src={`${URL}${encodeURIComponent(movie.title)}/banner.jpg`}
                    alt={movie.title}
                    className="movie-banner"
                  />
                ) : (
                  <div className="movie-banner-skeleton" />
                )}
              </div>
              <div className="movie-title">
                {movie.title}
                {movie.subtitle ? ` - ${movie.subtitle}` : ""}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
