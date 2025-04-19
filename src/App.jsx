import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { MoviesPage } from "./pages/MoviesPage";
import { ErrorPage } from "./pages/ErrorPage";
import { MoviesFormPage } from "./pages/MoviesFormPage";
import { Navbar } from "./components/NavbarComponent";
import { AuthProvider } from "./context/AuthContext";
import { MoviePlayer } from "./components/MoviePlayerComponent";

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
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
