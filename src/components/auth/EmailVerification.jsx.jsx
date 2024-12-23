import { Link } from "react-router-dom";
import "./auth.css";
import Navbar from "../header/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "../../hooks/useAuth";
import { useValidationResetPassword } from "../../hooks/useValidate";

const VerifyEmail = () => {
  const { createOtp, message, loading } = useResetPassword();
  const { resetPwValidationSchema } = useValidationResetPassword();

  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(resetPwValidationSchema),
  });

  const onSubmit = handleSubmit((values) => {
    createOtp(values.email.trim());
    sessionStorage.setItem("email", values.email.trim());
  });

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">Verifikasi Diri Anda</h2>
        <div className="form-container">
          <label className="label" htmlFor="email">
            Masukkan Email Verifikasi
          </label>
          <input
            type="text"
            id="email"
            placeholder="contoh: example@gmail.com"
            {...register("email")}
            className="auth-input"
          />

          {formState.errors.email ? (
            <p className="alert">{formState.errors.email.message}</p>
          ) : (
            message && <p className="alert">{message}</p>
          )}

          <button
            className="auth-btn"
            type="submit"
            disabled={loading && "true"}
          >
            {loading ? "Memproses.." : "Kirim Kode"}
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

export default VerifyEmail;
