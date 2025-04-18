import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useForm } from 'react-hook-form'
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const [error, setError] = useState(null); // Estado de error
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const {signup, isAuthenticated} = useAuth();

  //Manejo de errores
  if (error){
    console.log(error);
    navigate("/error/");
    return <p>Error: {error}</p>;
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  });

  return (
    <div class="login-container">
        <h1>Register</h1>
        <form class="login-form" onSubmit={onSubmit}>
            <label>
                Usuario:
                <input type="text"
                  {...register('username', { required: true })}
                />
            </label>
            <label>
                Contraseña:
                <input type="password"
                  {...register('password', { required: true })}
                />
            </label>
            <a href="/login">Ya tienes cuenta? click aqui</a>
            <button type="submit">Register</button>
        </form>
    </div>
  );
}
