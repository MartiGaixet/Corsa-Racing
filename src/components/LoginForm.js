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

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://localhost:7033/api/UsersApi/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      alert(error.message);
    }

    reset(); 
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="container gap-5">
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: "Este campo es obligatorio" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className="d-flex justify-content-center">
          <button className="mt-5 mx-auto botonLogin" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
