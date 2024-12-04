import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2007",
  withCredentials: true,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = null
// })

export default axiosInstance;
