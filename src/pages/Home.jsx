import "./home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuthContext();
  const navigate = useNavigate();

  const handleNavigation = (isLoginPath, notLoginPath) => {
    isAuthenticated ? navigate(isLoginPath) : navigate(notLoginPath);
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="main-home-title">
          <h1>Selamat datang {user?.username}</h1>
        </div>
        <div className="home-title">
          <h1>Make your plan</h1>
          <h4>On your TodoList</h4>
        </div>
        <div className="home-desc">
          <p>
            Tingkatkan produktifitas kamu, rencanakan kegiatan harianmu dengan{" "}
            <b>SanNotes</b>, Ayo{" "}
            {isAuthenticated ? "lihat tugasmu." : "mulai sekarang."}
          </p>
        </div>
        <div className="start-option">
          <button
            onClick={() => handleNavigation("/todos", "/login")}
            className="login-btn"
          >
            {isAuthenticated ? "Lihat Tugas" : "Mulai Sekarang"}
          </button>
          <button
            onClick={() => handleNavigation("/profile", "/register")}
            className="register-btn"
          >
            {isAuthenticated ? "Lihat Profil" : "Daftar Sekarang"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
