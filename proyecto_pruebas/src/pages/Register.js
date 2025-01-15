import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Datos recibidos en Login:", data); // q Verificar usuario y token
        navigate("/"); // Redirige al Dashboard
        alert("Usuario registrado con éxito.");

            
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  
  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="email">Name</label>
          <input
          
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
