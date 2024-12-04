import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { resolvePath, useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  async function registerPayload(username, email, password) {
    const payload = { username, email, password };

    try {
      const response = await axiosInstance.post("/register", payload);
      setMessage(response.data.message);

      if (response.data.message.success) {
        navigate("/login");
      }
      console.log(response.data.message.success);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Terjadi kesalahan");
      } else {
        setMessage("Terjadi kesalahan pada server");
      }
    }
  }

  const messages = {
    errorAll: message.all,
    errorUsername: message.username,
    errorEmail: message.email,
    errorPassword: message.password,
  };

  return {
    registerPayload,
    messages,
    navigate,
  };
};

export const useLogin = () => {
  const [message, setMessage] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  async function loginPayload(username, password) {
    const payload = { username, password };
    console.log(payload);

    try {
      const response = await axiosInstance.post("/login", payload);
      setMessage(response.data.message);
      setToken(response.data.accessToken);

      console.log(response.data.accessToken);

      if (response.data.message.success) {
        navigate("/todos");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Terjadi kesalahan");
      } else {
        setMessage("Terjadi kesalahan pada server");
      }
    }
  }

  useEffect(() => {
    console.log(token);
  }, [token]);

  const messages = {
    errorUsername: message.username,
    errorPassword: message.password,
  };

  return {
    token,
    loginPayload,
    messages,
  };
};

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/logout");

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return { logout };
};
