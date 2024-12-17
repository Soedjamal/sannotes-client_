import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import Navbar from "../header/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const OtpVerification = () => {
  const [showpass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const { register, formState, handleSubmit } = useForm({});

  const onSubmit = handleSubmit((values) => {
    OtpVerificationPayload(values.email.trim(), values.password);
  });

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">Kirim OTP</h2>
        <div className="form-container">
          <label className="label" htmlFor="email">
            Masukkan Kode
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="S-"
            value="S-"
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
      </form>
    </>
  );
};

export default OtpVerification;
