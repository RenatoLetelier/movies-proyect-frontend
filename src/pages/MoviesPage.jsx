import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RedirectButton } from "../components/RedirectButtonComponent";
import { useMovies } from "../context/MoviesContext";
import "./MoviesPage.css";

export function MoviesPage() {
  const { getMovies, movies } = useMovies();

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="movies-page">
      <div className="movies-header">
        <h1>Lista de Películas</h1>
        <div className="movies-buttons">
          <RedirectButton buttonText="Add new movie" route="/movies-form" />
          <RedirectButton buttonText="Back" route="../" />
        </div>
      </div>

      {movies.length === 0 ? (
        <p>No hay películas disponibles.</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/watch/${encodeURIComponent(movie.id)}`}
              className="movie-card"
            >
              <div className="movie-banner-wrapper">
                {movie.imgBanner ? (
                  <img
                    src={movie.imgBanner}
                    alt={movie.title}
                    className="movie-banner"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                    }}
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
