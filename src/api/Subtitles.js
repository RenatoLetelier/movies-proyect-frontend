import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const SUBURL = "/subtitles";

export const apiGetSubtitles = () => axios.get(`${URL}${SUBURL}`);
export const apiSeeSubtitle = (id) => axios.get(`${URL}${SUBURL}/stream/${id}`);
export const apiGetSubtitleById = (id) => axios.get(`${URL}${SUBURL}/${id}`);
export const apiCreateSubtitle = (Subtitle) =>
  axios.post(`${URL}${SUBURL}/`, Subtitle);
export const apiUpdateSubtitle = (id, Subtitle) =>
  axios.put(`${URL}${SUBURL}/${id}`, Subtitle);
export const apiDeleteSubtitle = (id) => axios.delete(`${URL}${SUBURL}/${id}`);
