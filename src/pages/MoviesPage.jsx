import { useState, useEffect } from "react";

export function Movies() {
  const [movies, setMovies] = useState([]); // Estado para almacenar las películas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:8000/movies");
        if (!response.ok) {
          throw new Error("Error al obtener las películas");
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Cargando películas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movies-container">
      <h1>Lista de Películas</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <a href={movie.address} target="_blank" rel="noopener noreferrer">
              {movie.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
