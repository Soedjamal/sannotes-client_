import { useEffect, useState } from "react";
import { useAuthorize } from "../hooks/useAuthorize";
import TodoWrapper from "../components/todo/TodoWrapper";
import axiosInstance from "../lib/axios";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";

const TodoList = () => {
  const { refreshToken } = useAuthorize();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <TodoWrapper />
    </>
  );
};

export default TodoList;
