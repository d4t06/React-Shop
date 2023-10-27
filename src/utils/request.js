import axios from "axios";

const request = axios.create({
   baseURL: import.meta.env.VITE_ENDPOINT,
   withCredentials: true,
});

export default request;
