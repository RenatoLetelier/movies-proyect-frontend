import { useParams } from "react-router-dom";

export function MoviePlayer() {
  const { id } = useParams();
  const streamUrl = `http://localhost:8000/api/movies/watch/${decodeURIComponent(id)}`;

  return (
    <div>
      <h2>Reproduciendo: {id}</h2>
      <video src={streamUrl} controls autoPlay style={{ width: "100%", maxWidth: "800px" }} />
    </div>
  );
}
