import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SignupForm() {

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
      <form onSubmit={handleSubmit(onSubmit)} className="container d-flex flex-column justify-content-center">
        <div>
          <label>Name</label>
          <input
          className="form-control"
            {...register("name", { required: "Este campo es obligatorio" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

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

        <div>
          <label>Confirm password</label>
          <input
            type="password"
            className="form-control"
            {...register("email", {
              required: "Este campo es obligatorio",})}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>

        {/* Campo de selección */}
        <div>
          <label>Country</label>
          <select className="form-control"{...register("country", { required: "Selecciona un país" })}>
            <option value="">Select...</option>
            <option value="es">Andorra</option>
            <option>Belgium</option>
            <option>Denmark</option>
            <option>Finland</option>
            <option>France</option>
            <option>Germany</option>
            <option>Italy</option>
            <option>Luxembourg</option>
            <option>Monaco</option>
            <option>Netherlands</option>
            <option>Norway</option>
            <option>Spain</option>
            <option>Sweden</option>
            <option>Switzerland</option>
          </select>
          {errors.country && <span>{errors.country.message}</span>}
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-center">
          <button className="mt-5 mx-auto botonLogin" type="submit" onClick={goHome}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;