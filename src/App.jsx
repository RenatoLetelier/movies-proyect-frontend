import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { Navbar } from "./components/NavbarComponent";
import { AuthProvider } from "./context/AuthContext";
import { MoviesPage } from "./pages/MoviesPage";
import { MoviesFormPage } from "./pages/MoviesFormPage";
import { MoviePlayer } from "./components/MoviePlayerComponent";
import { PhotosPage } from "./pages/PhotosPage";
import { PhotosFormPage } from "./pages/PhotosFormPage";
import { PhotoPlayer } from "./components/PhotoPlayerComponent";

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
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies-form" element={<MoviesFormPage />} />
            <Route path="/movies/watch/:id" element={<MoviePlayer />} />
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
