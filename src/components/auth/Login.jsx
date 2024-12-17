import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../header/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useValidationLogin } from "../../hooks/useValidate";
import { useLogin } from "../../hooks/useAuth";

const Login = () => {
  const [showpass, setShowPass] = useState(false);
  const { loginValidationSchema } = useValidationLogin();

  const { loginPayload, messages } = useLogin();

  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit = handleSubmit((values) => {
    loginPayload(values.username.trim(), values.password);
  });

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">Selamat Datang Kembali</h2>
        <div className="form-container">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="auth-input"
          />

          {formState.errors.username ? (
            <p className="alert">{formState.errors.username.message}</p>
          ) : (
            messages && <p className="alert">{messages.errorUsername}</p>
          )}

          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="input-password">
            <input
              type={showpass ? "text" : "password"}
              id="password"
              {...register("password")}
              className="auth-input-password"
            />

            {showpass ? (
              <FontAwesomeIcon
                onClick={() => setShowPass(!showpass)}
                icon={faEye}
              />
            ) : (
              <FontAwesomeIcon
                onClick={() => setShowPass(!showpass)}
                icon={faEyeSlash}
              />
            )}
          </div>

          {formState.errors.password ? (
            <p className="alert">{formState.errors.password.message}</p>
          ) : (
            messages && <p className="alert">{messages.errorPassword}</p>
          )}

          <Link to="/reset-password" className="forgot-password-link">
            Lupa password?
          </Link>

          <button className="auth-btn" type="submit">
            Masuk
          </button>
        </div>
        <h4 className="not-login">
          Belum punya akun?{" "}
          <Link className="not" to="/register">
            Daftar
          </Link>
        </h4>
      </form>
    </>
  );
};

export default Login;
