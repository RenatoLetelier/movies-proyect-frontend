import { createContext, useState, useContext } from "react";
import { apiGetMovies } from "../api/Movies";
import { apiSeeSubtitle } from "../api/Subtitles";

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
  const [subtitles, setSubtitles] = useState([]);

  const getMovies = async () => {
    try {
      const res = await apiGetMovies();
      setMovies(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubtitles = async () => {
    try {
      const res = await apiSeeSubtitle();
      setSubtitles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        getMovies,
        movies,
        getSubtitles,
        subtitles,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
