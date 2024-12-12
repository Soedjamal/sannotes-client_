import React from "react";
import { useForm } from "react-hook-form";

const PasswordReset = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((values) => {});

  return (
    <>
      <form className="password-reset-container" onSubmit={onSubmit}>
        <label htmlFor="email">Masukkan Email</label>
        <input type="email" {...register("email")} />
      </form>
    </>
  );
};

export default PasswordReset;
