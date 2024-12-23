import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import OtpVerification from "./components/auth/OTPVerification";
import VerifyEmail from "./components/auth/EmailVerification.jsx";
import ChagePassword from "./components/auth/ChangePassword.jsx";

const queryClient = new QueryClient();

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/todos",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password/verify-otp",
    element: <OtpVerification />,
  },
  {
    path: "/change-password",
    element: <ChagePassword />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
