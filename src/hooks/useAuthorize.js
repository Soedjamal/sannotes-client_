import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const useAuthorize = () => {
  const [token, setToken] = useState("");
  const [decodedId, setDecodedId] = useState("");
  const [decodedUsername, setDecodedUsername] = useState("");
  const [expire, setExpire] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.get("/token");
      const decoded = jwtDecode(response.data.accessToken);

      setDecodedId(decoded.id);
      setDecodedUsername(decoded.username);
      setExpire(decoded.exp);
      setToken(response.data.accessToken);

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const axiosJWT = axios.create({
    baseURL: "http://localhost:2007",
    withCredentials: true,
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();

      if (expire * 1000 < currentDate.getTime()) {
        try {
          const response = await axiosInstance.get("/token");
          setToken(response.data.accessToken);

          const decoded = jwtDecode(response.data.accessToken);
          setDecodedId(decoded.id);
          setDecodedUsername(decoded.username);
          setExpire(decoded.exp);
          setIsAuthenticated(true);

          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        } catch (error) {
          setIsAuthenticated(false);
          navigate("/login");
          throw error;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  return {
    token,
    expire,
    decodedId,
    decodedUsername,
    isAuthenticated,
    axiosJWT,
    refreshToken,
  };
};
