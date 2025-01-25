import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./MoviesPathInput.css";

export function MoviesPathInput() {
  const [path, setPath] = useState("");
  const navigate = useNavigate(); // Inicializamos navigate

  const handleSubmit = async () => {
    if (!path.trim()) {
      alert("Por favor, ingresa una ruta válida.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/movies/set-path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path }),
      });

      if (response.ok) {
        setPath("");
        navigate("/movies/");
      } else {
        alert("Error al enviar la ruta.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con la solicitud.");
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Indica ruta..."
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}
