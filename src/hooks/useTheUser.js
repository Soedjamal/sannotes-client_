import { useState } from "react";
import { useAuthorize } from "./useAuthorize";
import { useAuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const useTheUser = () => {
  const { axiosJWT } = useAuthorize();
  const { user, setUser } = useAuthContext();

  const getUser = async () => {
    try {
      const response = await axiosJWT.get("/user");
      setUser(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateUsername = async (payload) => {
    const response = await axiosJWT.patch(`/user/${payload.id}`, {
      username: payload.username,
    });
    return response.data;
  };

  return { getUser, updateUsername, user };
};
