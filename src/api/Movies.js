import axios from "axios";

const SUBURL = "/api/movies";

export const apiGetMovies = () => axios.get(`${SUBURL}`);
export const apiWatchMovie = (title) => axios.get(`${SUBURL}/watch/${title}`);
export const apiGetMovieByTitle = (title) => axios.get(`${SUBURL}/${title}`);
export const apiCreateMovie = (movie) => axios.post(`${SUBURL}/`, movie);
export const apiUpdateMovie = (title, movie) =>
  axios.put(`${SUBURL}/${title}`, movie);
export const apiDeleteMovie = (title) => axios.delete(`${SUBURL}/${title}`);
