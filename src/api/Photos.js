import axios from "axios";

const SUBURL = "/api/photos";

export const apiGetPhotos = () => axios.get(`${SUBURL}`);
export const apiSeePhoto = (name) => axios.get(`${SUBURL}/see/${name}`);
export const apiGetPhotoById = (id) => axios.get(`${SUBURL}/${id}`);
export const apiCreatePhoto = (photo) => axios.post(`${SUBURL}/`, photo);
export const apiUpdatePhoto = (id, photo) =>
  axios.put(`${SUBURL}/${id}`, photo);
export const apiDeletePhoto = (id) => axios.delete(`$${SUBURL}/${id}`);
