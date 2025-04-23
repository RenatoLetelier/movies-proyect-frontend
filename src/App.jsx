import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { Navbar } from "./components/NavbarComponent";
import { AuthProvider } from "./context/AuthContext";
import { SeriesPage } from "./pages/SeriesPage";
import { SeriesFormPage } from "./pages/SeriesFormPage";
import { SeriePlayer } from "./components/SeriePlayerComponent";
import { PhotosPage } from "./pages/PhotosPage";
import { PhotosFormPage } from "./pages/PhotosFormPage";
import { PhotoPlayer } from "./components/PhotoPlayerComponent";
import { MoviesProvider } from "./context/MoviesContext";
import MoviesRoutes from "./routes/MoviesRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <header>
          <Navbar />
        </header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/*"
              element={
                <MoviesProvider>
                  <MoviesRoutes />
                </MoviesProvider>
              }
            />

            {/* <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies-form" element={<MoviesFormPage />} />
            <Route path="/movies/watch/:id" element={<MoviePlayer />} /> */}
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/series-form" element={<SeriesFormPage />} />
            <Route path="/series/watch/:name" element={<SeriePlayer />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/photos-form" element={<PhotosFormPage />} />
            <Route path="/photos/see/:id" element={<PhotoPlayer />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
