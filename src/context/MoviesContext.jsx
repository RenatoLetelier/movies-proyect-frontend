import { createContext, useState, useContext } from "react";
import { apiGetMovies, apiWatchMovie, apiGetMovieById, apiCreateMovie, apiUpdateMovie, apiDeleteMovie } from "../api/Movies";

export const MoviesContext = createContext();

export const useMovies = () => {
    const context = useContext(MoviesContext);
    if (!context) {
        throw new Error("useMovies must be used within an MoviesProvider");
    }
    return context;
};

export const MoviesProvider = ({ children }) => {
    const [movie, setMovie] = useState(null);

    const getMovies = async () => {
        try {
            const res = await apiGetMovies();
            setMovie(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            user,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};