import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RedirectButton } from "./RedirectButtonComponent";
import { apiGetPhotoById, apiSeePhoto } from "../api/Photos";

const URL = import.meta.env.VITE_API_URL;

export function PhotoPlayer() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const streamUrl = `${URL}/photos/see/${decodeURIComponent(id)}`;

  useEffect(() => {
    if (!id) return;

    const fetchPhoto = async () => {
      try {
        const res = await apiGetPhotoById(`${decodeURIComponent(id)}`);
        const data = res.data;
        setPhoto(data);
      } catch (err) {
        console.error("Error al cargar la foto:", err);
      }
    };

    fetchPhoto();
  }, []);

  return (
    <div>
      {photo ? (
        <>
          <RedirectButton buttonText={"Back"} route={-1} />
          <RedirectButton
            buttonText={"Edit photo"}
            route={`/photos-form?id=${id}`}
          />

          <h2>{`${photo.name} - ${photo.metadata.location}`}</h2>

          <div style={{ position: "relative" }}>
            <img
              src={streamUrl}
              style={{ width: "100%", maxWidth: "100%" }}
              alt={photo.title}
            />
          </div>
        </>
      ) : (
        <p>Cargando foto...</p>
      )}
    </div>
  );
}
