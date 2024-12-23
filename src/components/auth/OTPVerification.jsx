import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import Navbar from "../header/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "../../hooks/useAuth";
import { useValidationResetPassword } from "../../hooks/useValidate";

const OtpVerification = () => {
  const navigate = useNavigate();
  const { verifyOtp, message } = useResetPassword();
  const { resetPwValidationSchema } = useValidationResetPassword();

  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(resetPwValidationSchema),
  });

  const onSubmit = handleSubmit((values) => {
    const email = sessionStorage.getItem("email");
    verifyOtp(values.otp.trim(), email);
  });

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">Kirim Kode Verifikasi</h2>
        <div className="form-container">
          <label className="label" htmlFor="email">
            Masukkan Kode
          </label>
          <input
            type="text"
            placeholder="Masukkan 6 digit kode"
            {...register("otp")}
            className="auth-input"
          />

          {formState.errors.otp ? (
            <p className="alert">{formState.errors.otp.message}</p>
          ) : (
            message && <p className="alert">{message}</p>
          )}

          <button className="auth-btn" type="submit">
            Kirim Kode
          </button>
        </div>
      </form>
    </>
  );
};

export default OtpVerification;
