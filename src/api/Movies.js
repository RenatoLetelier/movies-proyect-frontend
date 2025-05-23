import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}`;
const SUBURL = "/movies";

export const apiGetMovies = () => axios.get(`${URL}${SUBURL}`);
export const apiWatchMovie = (title) =>
  axios.get(`${URL}${SUBURL}/watch/${title}`);
export const apiGetMovieByTitle = (title) =>
  axios.get(`${URL}${SUBURL}/${title}`);
export const apiCreateMovie = (movie) => axios.post(`${URL}${SUBURL}/`, movie);
export const apiUpdateMovie = (title, movie) =>
  axios.put(`${URL}${SUBURL}/${title}`, movie);
export const apiDeleteMovie = (title) =>
  axios.delete(`${URL}${SUBURL}/${title}`);
