import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import "./LoginPage.css";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [error, setError] = useState(null); // Estado de error
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const {signin, isAuthenticated} = useAuth();

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
    signin(values)
  });

  return (
    <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={onSubmit}>
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
            <a href="/login">No tienes cuenta? click aqui</a>
            <button type="submit">Log in</button>
        </form>
    </div>
  );
}
