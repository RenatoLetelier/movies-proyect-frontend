import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Movies() {
  const [movies, setMovies] = useState(null); // Estado para almacenar las películas
  const [error, setError] = useState(null); // Estado de error
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.1.83:8000/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las películas");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message));
  }, []);

  //Manejo de errores
  if (error){
    console.log(error);
    navigate("/error/");
    return <p>Error: {error}</p>;
  } 

  return (
    <div className="movies-container">
      <h1>Lista de Películas</h1>
      <ul>
        {movies?.map((movie) => (
          <li key={movie.id}>
            <a href={movie.address} target="_blank">
              {movie.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
