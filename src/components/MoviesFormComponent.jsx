import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiGetMovieById } from "../api/Movies";
import { useNavigate } from "react-router-dom";
import { apiCreateMovie, apiUpdateMovie } from "../api/Movies";

export function MoviesFormComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    imgBanner: "",
    year: "",
    director: "",
    duration: "",
    seen: false,
    rating: "",
    trailer: "",
    path: "",
    actors: [],
    genres: [],
  });

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const res = await apiGetMovieById(movieId);
        const data = res.data;

        setFormData({
          ...data,
          actors: Array.isArray(data.actors) ? data.actors : [],
          genres: Array.isArray(data.genres) ? data.genres : [],
        });
      } catch (err) {
        console.error("Error al cargar película:", err);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movieId) {
      apiCreateMovie(formData);
    } else {
      apiUpdateMovie(movieId, formData);
    }
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
      />
      <input
        name="subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        placeholder="Subtítulo"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <input
        name="imgBanner"
        value={formData.imgBanner}
        onChange={handleChange}
        placeholder="URL del Banner"
      />
      <input
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Año"
      />
      <input
        name="director"
        value={formData.director}
        onChange={handleChange}
        placeholder="Director"
      />
      <input
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duración (min)"
      />
      <label>
        ¿Vista?
        <input
          type="checkbox"
          name="seen"
          checked={formData.seen}
          onChange={handleChange}
        />
      </label>
      <input
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating"
      />
      <input
        name="trailer"
        value={formData.trailer}
        onChange={handleChange}
        placeholder="URL del Trailer"
      />
      <input
        name="path"
        value={formData.path}
        onChange={handleChange}
        placeholder="Ruta del archivo"
      />
      <input
        name="actors"
        value={formData.actors.join(", ")}
        onChange={(e) => handleArrayChange(e, "actors")}
        placeholder="Actores (separados por coma)"
      />
      <input
        name="genres"
        value={formData.genres.join(", ")}
        onChange={(e) => handleArrayChange(e, "genres")}
        placeholder="Géneros (separados por coma)"
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
