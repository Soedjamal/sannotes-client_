import { useState, useEffect } from "react";
import { useAuthorize } from "./useAuthorize";
import { useAuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const useTheUser = () => {
  const { axiosJWT } = useAuthorize();
  const { user, setUser } = useAuthContext();
  const [username, setUsername] = useState();

  const getUser = async () => {
    try {
      const response = await axiosJWT.get("/user");
      setUser(response.data);
      return response.data;
    } catch (err) {
      return null;
    }
  };

  const updateUsername = async (payload) => {
    const response = await axiosJWT.patch(`/user/${payload.id}`, {
      username: payload.username,
    });
    return response.data;
  };

  const getUsername = async () => {
    const res = await axiosJWT.get("/user");

    setUsername(res.data.username);
  };

  useEffect(() => {
    getUsername();
  }, []);

  return { getUser, updateUsername, user, username };
};
