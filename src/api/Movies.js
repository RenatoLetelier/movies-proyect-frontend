import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const SUBURL = "/movies";

export const apiGetMovies = () => axios.get(`${URL}${SUBURL}`)
export const apiWatchMovie = (id) => axios.get(`${URL}${SUBURL}/watch/${id}`)
export const apiGetMovieById = (id) => axios.get(`${URL}${SUBURL}/${id}`)
export const apiCreateMovie = (movie) => axios.post(`${URL}${SUBURL}/`, movie)
export const apiUpdateMovie = (id, movie) => axios.put(`${URL}${SUBURL}/${id}`, movie)
export const apiDeleteMovie = (id) => axios.delete(`${URL}${SUBURL}/${id}`)