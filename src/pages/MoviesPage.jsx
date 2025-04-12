import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiGetMovies } from "../api/Movies";

export function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await apiGetMovies();
        setMovies(res.data);
      } catch (err) {
        setError("No se pudo cargar la lista de películas.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Cargando películas...</p>;

  if (error) return (navigate("/error/"));

  return (
    <div className="movies-container">
      <h1>Lista de Películas</h1>
      {movies.length === 0 ? (
        <p>No hay películas disponibles.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/watch/${encodeURIComponent(movie.id)}`}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
