import { useParams } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL;

export function MoviePlayer() {
  const { id } = useParams();
  const streamUrl = `${URL}/movies/watch/${decodeURIComponent(id)}`;

  return (
    <div>
      <h2>Reproduciendo: {id}</h2>
      <video src={streamUrl} controls autoPlay style={{ width: "100%", maxWidth: "800px" }} />
    </div>
  );
}
