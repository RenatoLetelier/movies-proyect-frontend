import axios from "axios";

const SUBURL = "/api/subtitles";

export const apiGetSubtitles = () => axios.get(`${SUBURL}`);
export const apiSeeSubtitle = (id) => axios.get(`${SUBURL}/stream/${id}`);
export const apiGetSubtitleById = (id) => axios.get(`${SUBURL}/${id}`);
export const apiCreateSubtitle = (Subtitle) =>
  axios.post(`${SUBURL}/`, Subtitle);
export const apiUpdateSubtitle = (id, Subtitle) =>
  axios.put(`${SUBURL}/${id}`, Subtitle);
export const apiDeleteSubtitle = (id) => axios.delete(`${SUBURL}/${id}`);
