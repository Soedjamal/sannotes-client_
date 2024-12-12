import { useState } from "react";
import { useAuthorize } from "./useAuthorize";
import { useAuthContext } from "../context/AuthContext";

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

  return { getUser, user };
};
