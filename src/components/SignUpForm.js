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

  const onSubmit = async (data) => {
    // Eliminar confirmPassword antes de enviarlo al backend
    const { confirmPassword, ...userData } = data;
  
    try {
      const response = await fetch("https://localhost:7033/api/UsersApi/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData), // Enviamos solo los datos necesarios
      });
  
      if (response.ok) {
        alert("Registro exitoso");
        reset();
        navigate("/"); // Redirige al home o login
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="container d-flex flex-column justify-content-center">
        <div>
          <label>Name</label>
          <input className="form-control" {...register("name", { required: "Este campo es obligatorio" })} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" className="form-control" {...register("email", { required: "Este campo es obligatorio" })} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password</label>
          <input type="password" className="form-control" {...register("password", { required: "Este campo es obligatorio" })} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label>Confirm password</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword", { required: "Este campo es obligatorio" })}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>

        <div>
          <label>Country</label>
          <select className="form-control" {...register("country", { required: "Selecciona un país" })}>
            <option value="">Select...</option>
            <option value="Andorra">Andorra</option>
            <option value="Belgium">Belgium</option>
            <option value="Spain">Spain</option>
            {/* Agrega más países si es necesario */}
          </select>
          {errors.country && <span>{errors.country.message}</span>}
        </div>

        <div className="d-flex justify-content-center">
          <button className="mt-5 mx-auto botonLogin" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
