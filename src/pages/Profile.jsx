import React, { useEffect, useState } from "react";
import "./profile.css";
import Navbar from "../components/header/Navbar";
import { useNavigate } from "react-router-dom";
import { useTheUser } from "../hooks/useTheUser";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { getUser } = useTheUser();
  // const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (user) {
      setIsAuthenticated(!isAuthenticated);
    }
  }, []);

  const handleNavigation = (login, notLogin) => {
    isAuthenticated ? navigate(login) : navigate(notLogin);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-biodata">
          <h1 className="profile-title">Your Profile</h1>
          <div className="profile-bio">
            <div className="username-title-container">
              <h1>Hello</h1>
              <h2 className="username">{user ? user.username : null}</h2>
              <span className="halo">{user ? "🖐" : "..."}</span>
            </div>
            <div className="email-title-container">
              <h2 className="greet-email">Your account </h2>
              <h3 className="email">{user ? user.email : null}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
