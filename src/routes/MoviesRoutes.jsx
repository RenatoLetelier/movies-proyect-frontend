import { Route, Routes } from "react-router-dom";
import { MoviesPage } from "../pages/MoviesPage";
import { MoviesFormPage } from "../pages/MoviesFormPage";
import { MoviePlayer } from "../components/MoviePlayerComponent";

export default function MoviesRoutes() {
  return (
    <Routes>
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies-form" element={<MoviesFormPage />} />
      <Route path="/movies/watch/:title" element={<MoviePlayer />} />
    </Routes>
  );
}
