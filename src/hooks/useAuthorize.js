import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const useAuthorize = () => {
  const {
    setIsAuthenticated,
    isAuthenticated,
    setExpire,
    expire,
    setToken,
    token,
  } = useAuthContext();

  const [userDecode, setDecodedUser] = useState([]);

  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.get("/token");
      const decoded = jwtDecode(response.data.accessToken);

      setDecodedUser(decoded);
      setExpire(decoded.exp);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const axiosJWT = axios.create({
    baseURL: "http://localhost:5000",
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
          setDecodedUser(decoded);
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
    (error) => Promise.reject(error)
  );

  return {
    axiosJWT,
    refreshToken,
    navigate,
    userDecode,
  };
};
