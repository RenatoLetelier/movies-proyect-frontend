import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RedirectButton } from "./RedirectButtonComponent";
import { apiGetMovieByTitle } from "../api/Movies";
import { useMovies } from "../context/MoviesContext";

export function MoviePlayer() {
  const { subtitles } = useMovies();
  const { title } = useParams();
  const videoUrl = `/api/movies/watch/${decodeURIComponent(title)}`;
  const audioUrl = `/api/audio/stream/${decodeURIComponent(title)}`;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchMovie = async () => {
      try {
        const res = await apiGetMovieByTitle(`${decodeURIComponent(title)}`);
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
            route={`/movies-form?title=${movie?.id ? title : ""}`}
          />

          <h2>{`${movie.title}`}</h2>
          {movie.subtitle ? <h2>{`${movie.subtitle}`}</h2> : ""}

          <div style={{ position: "relative" }}>
            <video
              src={videoUrl}
              controls
              style={{ width: "100%", maxWidth: "100%" }}
              onPlay={() => {
                document.getElementById("external-audio");
              }}
              onPause={() => {
                const audio = document.getElementById("external-audio");
                if (audio) audio.pause();
              }}
              onSeeked={(e) => {
                const audio = document.getElementById("external-audio");
                if (audio) audio.currentTime = e.target.currentTime;
              }}
            >
              <track src={subtitles} kind="subtitles" />
            </video>

            <audio id="external-audio" src={audioUrl} preload="auto" />
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
