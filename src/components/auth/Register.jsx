import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../header/Navbar";
import { useRegister } from "../../hooks/useAuth";
import { useValidateRegister } from "../../hooks/useValidate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const [showpass, setShowPass] = useState(false);
  const { registerPayload, messages, navigate, loading } = useRegister();
  const { registerValidationSchema } = useValidateRegister();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerValidationSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const { username, email, password } = values;

    await registerPayload(values.username, values.email, values.password);

    navigate();

    console.log(username, email, password);
  });

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">Buat Akun</h2>

        <div className="form-container">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="contoh: SanNotes"
            id="username"
            {...register("username")}
            className="auth-input"
          />

          {formState.errors.username ? (
            <p className="alert">{formState.errors.username.message}</p>
          ) : (
            messages && <p className="alert">{messages.errorAll}</p>
          )}

          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="contoh: sannotes@example.com"
            id="email"
            {...register("email")}
            className="auth-input"
          />

          {formState.errors.email ? (
            <p className="alert">{formState.errors.email.message}</p>
          ) : (
            messages && <p className="alert">{messages.errorAll}</p>
          )}

          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="input-password">
            <input
              type={showpass ? "text" : "password"}
              id="password"
              placeholder="Buat password yang kuat"
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
          {formState.errors.password && (
            <p className="alert">{formState.errors.password.message}</p>
          )}

          <button className="auth-btn" type="submit" disabled={loading && true}>
            {loading ? "Membuat Akun.." : "Buat Akun"}
          </button>
        </div>

        <h4 className="not-register">
          Sudah punya akun?{" "}
          <Link className="not" to="/login">
            Login
          </Link>
        </h4>
      </form>
    </>
  );
};

export default Register;
