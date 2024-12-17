import { useState } from "react";
import { useAuthorize } from "../hooks/useAuthorize";

export const useTodo = () => {
  const { axiosJWT } = useAuthorize();
  const [message, setMessage] = useState("");
  const [msgTimeout, setMsgTimeOut] = useState(false);

  const fetchTodos = async () => {
    const response = await axiosJWT.get("/todos");
    return response.data;
  };

  const createTodo = async (todo) => {
    const response = await axiosJWT.post("/todos/create", todo);
    return response.data;
  };

  const deleteTodo = async (id) => {
    await axiosJWT.delete(`/todos/delete/${id}`);
  };

  const editTask = async ({ id, task }) => {
    const response = await axiosJWT.patch(`/todos/edit/${id}`, { task });
    return response.data;
  };

  const completeTask = async ({ id, completed }) => {
    const response = await axiosJWT.patch(`/todos/complete/${id}`, {
      completed,
    });
    return response.data;
  };

  const createTaskDesc = async ({ id, taskDescription }) => {
    try {
      const response = await axiosJWT.patch(`/todos/create/${id}`, {
        taskDescription,
      });

      setMessage(response.data.message);
      console.log(response.data.message);
      setMsgTimeOut(true);

      setTimeout(() => {
        setMsgTimeOut(false);
      }, 3000);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchTodos,
    createTodo,
    deleteTodo,
    editTask,
    completeTask,
    createTaskDesc,
    message,
    msgTimeout,
  };
};
