import { useEffect, useState } from "react";
import { useAuthorize } from "../hooks/useAuthorize";
import TodoWrapper from "../components/todo/NotesWrapper-04";
import axiosInstance from "../lib/axios";
import { jwtDecode } from "jwt-decode";

const TodoList = () => {
  const { refreshToken } = useAuthorize();

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
