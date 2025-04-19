import React, { useState, useEffect } from "react";
import { apiGetPhotos } from "../api/Photos";
import { useNavigate, Link } from "react-router-dom";
import { RedirectButton } from "../components/RedirectButtonComponent";

export function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await apiGetPhotos();
        setPhotos(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("No se pudo cargar la lista de fotos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="photos-container">
      <div>
        <h1>Lista de fotos</h1>
        <RedirectButton buttonText={"Add new foto"} route={"/photos-form"} />
        <RedirectButton buttonText={"Back"} route={"../"} />
      </div>
      {photos.length === 0 ? (
        <p>No hay películas disponibles.</p>
      ) : (
        <ul>
          {photos.map((photo) => (
            <li key={photo.id}>
              <Link to={`/photos/see/${encodeURIComponent(photo.id)}`}>
                {photo.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
