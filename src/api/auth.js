import axios from "axios";

const SUBURL = "/api/auth";

export const registerRequest = (user) => axios.post(`${SUBURL}/register`, user);
export const loginRequest = (user) => axios.post(`${SUBURL}/login`, user);
