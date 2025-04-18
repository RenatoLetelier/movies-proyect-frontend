import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const registerRequest = user => axios.post(`${URL}/auth/register`, user)
export const loginRequest = user => axios.post(`${URL}/auth/login`, user)
