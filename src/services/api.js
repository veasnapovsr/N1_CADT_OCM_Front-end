import axios from "axios";

const api = axios.create({
  baseURL: "http://10.11.11.68:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
