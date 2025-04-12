import axios from "axios";
import env from "react-dotenv";

export const registerRequest = user => axios.post(`${env.API_URL}/auth/register`, user)
export const loginRequest = user => axios.post(`${env.API_URL}/auth/login`, user)

