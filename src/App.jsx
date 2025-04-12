import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/LoginPage'
import { Register } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { Movies } from './pages/MoviesPage';
import { ErrorPage } from './pages/ErrorPage';
import { Navbar } from './components/NavbarComponent';
import { AuthProvider } from './context/AuthContext';
import { MoviePlayer } from './components/MoviePlayerComponent';

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/watch/:id" element={<MoviePlayer />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
