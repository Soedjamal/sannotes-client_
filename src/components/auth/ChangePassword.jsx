import { Link } from "react-router-dom";
import "./auth.css";
import Navbar from "../header/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "../../hooks/useAuth";
import { useValidationResetPassword } from "../../hooks/useValidate";

const ChagePassword = () => {
  const { changePassword, message } = useResetPassword();
  const { resetPwValidationSchema } = useValidationResetPassword();

  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(resetPwValidationSchema),
  });

  const onSubmit = handleSubmit((values) => {
    changePassword(values.password.trim());
  });

  return (
    <>
      <Navbar />
      <form className="form" onSubmit={onSubmit}>
        <h2 className="title">Ganti Password</h2>
        <div className="form-container">
          <label className="label" htmlFor="email">
            Password Baru
          </label>
          <input
            type="text"
            id="email"
            placeholder="Masukkan password baru"
            {...register("password")}
            className="auth-input"
          />

          {formState.errors.password ? (
            <p className="alert">{formState.errors.password.message}</p>
          ) : (
            message && <p className="alert">{message}</p>
          )}

          <button className="auth-btn" type="submit">
            Ganti Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ChagePassword;
