import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoviesPathInput } from './components/MoviesPathInput'
import { Movies } from './pages/MoviesPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesPathInput />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
