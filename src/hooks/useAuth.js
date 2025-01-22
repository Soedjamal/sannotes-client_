import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { replace, useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function registerPayload(username, email, password) {
    const payload = { username, email, password };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/register", payload);
      setMessage(response.data.message);

      if (response.status === 200) {
        navigate("/login");
        setLoading(false);
      }
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setMessage(err.response.data.message);
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
    loading,
    navigate,
  };
};

export const useLogin = () => {
  const [message, setMessage] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function loginPayload(username, password) {
    const payload = { username, password };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/login", payload);
      setMessage(response.data.message);
      setToken(response.data.accessToken);

      if (response.status === 200) {
        navigate("/todos");
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setMessage(error.response.data.message || "Terjadi kesalahan");
      }
    }
  }

  const messages = {
    errorUsername: message.username,
    errorPassword: message.password,
  };

  return {
    token,
    loginPayload,
    loading,
    messages,
  };
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function createOtp(email) {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/forgot-password", { email });

      if (response.status === 200) {
        navigate("./verify-otp");
        setLoading(false);
      }

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
      setLoading(false);
    }
  }

  async function verifyOtp(otpCode, email) {
    console.log({ otpCode, email });
    try {
      const response = await axiosInstance.post("/verify-otp", {
        otp: otpCode,
        email: email,
      });

      if (response.status === 200) {
        navigate("/change-password");
      }

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  async function changePassword(newPassword) {
    try {
      const response = await axiosInstance.patch(
        "/reset-password",
        {
          password: newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/");
        sessionStorage.removeItem("email");
      }

      setMessage(response.data.message);
    } catch (error) {
      setMessage(response.data.message);
    }
  }

  return {
    loading,
    message,
    createOtp,
    verifyOtp,
    changePassword,
  };
};

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/logout");

      if (response.status === 200) {
        window.location.replace("/");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return { logout };
};
