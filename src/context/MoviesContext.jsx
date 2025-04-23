import { createContext, useState, useContext } from "react";
import { apiGetMovies } from "../api/Movies";

export const MoviesContext = createContext();

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within an MoviesProvider");
  }
  return context;
};

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  // Fetch movies from the API when the component mounts
  const getMovies = async () => {
    try {
      const res = await apiGetMovies();
      setMovies(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        getMovies,
        movies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
