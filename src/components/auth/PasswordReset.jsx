import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import Navbar from "../header/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const PasswordReset = () => {
  const [showpass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const { register, formState, handleSubmit } = useForm({});

  const onSubmit = handleSubmit((values) => {
    PasswordResetPayload(values.email.trim(), values.password);
  });

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">Reset Password</h2>
        <div className="form-container">
          <label className="label" htmlFor="email">
            Masukkan Email Verifikasi
          </label>
          <input
            type="text"
            id="email"
            {...register("email")}
            className="auth-input"
          />

          {/* {formState.errors.email ? (
            <p className="alert">{formState.errors.email.message}</p>
          ) : (
            messages && <p className="alert">{messages.erroremail}</p>
          )}

          {formState.errors.password ? (
            <p className="alert">{formState.errors.password.message}</p>
          ) : (
            messages && <p className="alert">{messages.errorPassword}</p>
          )} */}
          <button
            onClick={() => navigate("./verified-otp")}
            className="auth-btn"
            type="submit"
          >
            Kirim Kode
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

export default PasswordReset;
