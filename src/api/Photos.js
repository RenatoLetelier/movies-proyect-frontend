import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const SUBURL = "/api/photos";

export const apiGetPhotos = () => axios.get(`${URL}${SUBURL}`);
export const apiSeePhoto = (name) => axios.get(`${URL}${SUBURL}/see/${name}`);
export const apiGetPhotoById = (id) => axios.get(`${URL}${SUBURL}/${id}`);
export const apiCreatePhoto = (photo) => axios.post(`${URL}${SUBURL}/`, photo);
export const apiUpdatePhoto = (id, photo) =>
  axios.put(`${URL}${SUBURL}/${id}`, photo);
export const apiDeletePhoto = (id) => axios.delete(`${URL}${SUBURL}/${id}`);
