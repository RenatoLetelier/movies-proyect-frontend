import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiGetPhotoById, apiCreatePhoto, apiUpdatePhoto } from "../api/Photos";
import { useNavigate } from "react-router-dom";

export function PhotosFormComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const photoId = queryParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    uploadBy: "",
    isFavorite: false,
    isPrivate: false,
    orientation: "",
    path: "",
    tags: [],
    albums: [],
    metadata: {
      location: "",
      dimensions: "",
      size: "",
      photoDate: "",
      photoTime: "",
      people: [],
    },
  });

  useEffect(() => {
    if (!photoId) return;

    const fetchPhoto = async () => {
      try {
        const res = await apiGetPhotoById(photoId);
        const data = res.data;

        setFormData({
          ...data,
          tags: Array.isArray(data.tags) ? data.tags : [],
          albums: Array.isArray(data.albums) ? data.albums : [],
          metadata: {
            location: data?.metadata?.location || "",
            dimensions: data?.metadata?.dimensions || "",
            size: data?.metadata?.size || "",
            photoDate: data?.metadata?.photoDate || "",
            photoTime: data?.metadata?.photoTime || "",
            people: Array.isArray(data?.metadata?.people)
              ? data.metadata.people
              : [],
          },
        });
      } catch (err) {
        console.error("Error al cargar la foto: ", err);
      }
    };

    fetchPhoto();
  }, [photoId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    if (field.startsWith("metadata.")) {
      const key = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [key]: values,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: values,
      }));
    }
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!photoId) {
        await apiCreatePhoto(formData);
      } else {
        await apiUpdatePhoto(photoId, formData);
      }
      navigate(-1);
    } catch (err) {
      console.error("Error al guardar la foto: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="photo-form">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre de la foto"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <input
        name="uploadBy"
        value={formData.uploadBy}
        onChange={handleChange}
        placeholder="Subido por"
      />
      <label>
        ¿Favorita?
        <input
          type="checkbox"
          name="isFavorite"
          checked={formData.isFavorite}
          onChange={handleChange}
        />
      </label>
      <label>
        ¿Privada?
        <input
          type="checkbox"
          name="isPrivate"
          checked={formData.isPrivate}
          onChange={handleChange}
        />
      </label>
      <input
        name="orientation"
        value={formData.orientation}
        onChange={handleChange}
        placeholder="Orientación (horizontal/vertical)"
      />
      <input
        name="path"
        value={formData.path}
        onChange={handleChange}
        placeholder="Ruta del archivo"
      />
      <input
        name="tags"
        value={formData.tags.join(", ")}
        onChange={(e) => handleArrayChange(e, "tags")}
        placeholder="Tags (separados por coma)"
      />
      <input
        name="albums"
        value={formData.albums.join(", ")}
        onChange={(e) => handleArrayChange(e, "albums")}
        placeholder="Álbumes (separados por coma)"
      />

      <h4>Metadatos</h4>
      <input
        name="location"
        value={formData.metadata.location}
        onChange={handleMetadataChange}
        placeholder="Ubicación"
      />
      <input
        name="dimensions"
        value={formData.metadata.dimensions}
        onChange={handleMetadataChange}
        placeholder="Dimensiones (ej: 1920x1080)"
      />
      <input
        name="size"
        value={formData.metadata.size}
        onChange={handleMetadataChange}
        placeholder="Tamaño del archivo"
      />
      <input
        name="photoDate"
        value={formData.metadata.photoDate}
        onChange={handleMetadataChange}
        placeholder="Fecha de la foto"
      />
      <input
        name="photoTime"
        value={formData.metadata.photoTime}
        onChange={handleMetadataChange}
        placeholder="Hora de la foto"
      />
      <input
        name="people"
        value={formData.metadata.people.join(", ")}
        onChange={(e) => handleArrayChange(e, "metadata.people")}
        placeholder="Personas (separadas por coma)"
      />

      <button type="submit">Guardar</button>
    </form>
  );
}
