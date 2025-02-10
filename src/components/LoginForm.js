import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
    reset(); // Resetea el formulario después del envío
  };

  const goHome = () => {
    navigate("/");
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="container gap-5">

        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: "Este campo es obligatorio",})}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            {...register("email", {
              required: "Este campo es obligatorio",})}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>

        <div className="d-flex justify-content-center">
          <button className="mt-5 mx-auto botonLogin" type="submit" onClick={goHome}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;