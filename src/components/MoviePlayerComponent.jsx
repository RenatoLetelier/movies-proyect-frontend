import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RedirectButton } from "./RedirectButtonComponent";
import { apiGetMovieById, apiWatchMovie } from "../api/Movies";
import { apiSeeSubtitle } from "../api/Subtitles";

const URL = import.meta.env.VITE_API_URL;

export function MoviePlayer() {
  const { id } = useParams();
  const streamUrl = `${URL}/movies/watch/${decodeURIComponent(id)}`;
  const streamSubtitle = `/api/subtitles/stream/${decodeURIComponent(id)}`;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await apiGetMovieById(`${decodeURIComponent(id)}`);
        const data = res.data;
        setMovie(data);
      } catch (err) {
        console.error("Error al cargar película:", err);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div>
      {movie ? (
        <>
          <RedirectButton buttonText={"Back"} route={-1} />
          <RedirectButton
            buttonText={"Edit movie"}
            route={`/movies-form?id=${id}`}
          />

          <h2>{`${movie.title} - ${movie.subtitle}`}</h2>

          <div style={{ position: "relative" }}>
            <video
              src={streamUrl}
              controls
              style={{ width: "100%", maxWidth: "100%" }}
              onPlay={() => document.getElementById("external-audio").play()}
              onPause={() => document.getElementById("external-audio").pause()}
              onSeeked={(e) => {
                const audio = document.getElementById("external-audio");
                audio.currentTime = e.target.currentTime;
              }}
            >
              <track
                label="Español"
                kind="subtitles"
                srcLang="es"
                src={streamSubtitle}
                default
                crossOrigin="anonymous"
              />
            </video>
          </div>

          <h2>{`description: ${movie.description}`}</h2>
          <h2>{`director: ${movie.director}`}</h2>
          <h2>{`duration: ${movie.duration}`}</h2>
          <h2>{`genre: ${movie.genre}`}</h2>
          <h2>{`rating: ${movie.rating}`}</h2>
          <a href={`${movie.trailer}`} target="_blank" rel="noreferrer">
            {movie.trailer}
          </a>
          <h2>{`year: ${movie.year}`}</h2>
        </>
      ) : (
        <p>Cargando película...</p>
      )}
    </div>
  );
}
