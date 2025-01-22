import "./styles/home.css";
import Navbar from "../components/header/Navbar";
import { useAuthContext } from "../context/AuthContext";
import { useAuthorize } from "../hooks/useAuthorize";
import { useTheUser } from "../hooks/useTheUser";
import axiosInstance from "../lib/axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleLoader } from "../components/atoms/Loader";
import ToggleTheme from "../components/atoms/ToggleTheme";
import { jwtDecode } from "jwt-decode";
import { getTime } from "date-fns";
import Footer from "../components/footer/Footer";

const Home = () => {
  const { isAuthenticated } = useAuthContext();
  const { navigate, axiosJWT } = useAuthorize();
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [load, setLoad] = useState(false);
  const [expire, setExpire] = useState(false);

  const fetchUser = async () => {
    setLoad(true);
    try {
      const token = await axiosInstance.get("/token");

      const decode = jwtDecode(token.data.accessToken);
      if (decode.exp * 1000 < new Date(getTime())) {
        setExpire(true);
      }

      const res = await axiosInstance.get("/user", {
        headers: {
          Authorization: `Bearer ${token.data.accessToken}`,
        },
      });
      if (res.status === 200) {
        setUser(res.data);
        console.log(res.data);
        setIsAuth(true);
        setLoad(false);
      }
      console.log(res);
    } catch (err) {
      console.log(err.response);
      setIsAuth(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleNavigation = (isLoginPath, notLoginPath) => {
    isAuth ? navigate(isLoginPath) : navigate(notLoginPath);
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-title">
          {/* <p>{user?.username}</p> */}
          <h1 className="hooks-title">Make your plan</h1>
          <h2 className="desc-title">On your Notes.</h2>
        </div>
        <div className="home-desc">
          <div className="home-desc-head">
            <h2>Kelola kegiatan mu</h2>
            <p>
              SanNotes adalah aplikasi web to-do list modern yang membantu Anda
              mencatat, mengatur, dan menyelesaikan tugas dengan antarmuka
              sederhana, fitur unggul, serta pengalaman pengguna terbaik.
            </p>
          </div>
          {/* <ToggleTheme /> */}
          <img
            className="sannotes-maskot"
            src="/images/home/snotMaskt.png"
            alt=""
          />
          {/* <b>SanNotes</b>, Ayo{" "} */}
          {/* {isAuthenticated ? "lihat tugasmu." : "mulai sekarang."} */}
        </div>
        <div className="start-option">
          <div className="cta-head">
            <h2>Mulai tugas pertamamu</h2>
            <img
              className="cta-head-img"
              src="/images/home/partial-first.png"
              alt=""
            />
          </div>

          <div className="btn-cta">
            <button
              onClick={() => handleNavigation("/todos", "/login")}
              className="login-btn"
            >
              {isAuth ? "Lihat Tugas" : "Mulai Sekarang"}
            </button>
            <button
              onClick={() => handleNavigation("/profile", "/register")}
              className="register-btn"
            >
              {isAuth ? "Lihat Profil" : "Daftar Sekarang"}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
