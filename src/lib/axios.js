import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2007",
  withCredentials: true,
});

export default axiosInstance;
