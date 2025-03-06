import React, { useState } from "react";
import api from "../api";

const CrearCliente = () => {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "",
    contraseña: "",
  });

  const handleNuevoCliente = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (
      !nuevoCliente.nombre ||
      !nuevoCliente.apellido ||
      !nuevoCliente.email ||
      !nuevoCliente.contraseña ||
      !nuevoCliente.rol
    ) {
      alert("Por favor, completa todos los campos del cliente.");
      return;
    }

    try {
      // Llamar a la API para crear un nuevo cliente
      const response = await api.post("/usuarios", nuevoCliente);

      alert("Cliente creado correctamente.");
      console.log("Cliente creado:", response.data);

      // Limpiar el formulario después de crear el cliente
      setNuevoCliente({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        rol: "",
        contraseña: "",
      });
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      alert("No se pudo crear el cliente. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="details-section">
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Crear Nuevo Cliente</h1>
      <form onSubmit={handleNuevoCliente} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={nuevoCliente.nombre}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            placeholder="Apellido"
            value={nuevoCliente.apellido}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, apellido: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={nuevoCliente.email}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            placeholder="Teléfono"
            value={nuevoCliente.telefono}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            value={nuevoCliente.rol}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, rol: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: "#f8f9fa",
              fontSize: "16px",
              color: "#495057",
            }}
          >
            <option value="">--Seleccionar Rol--</option>
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
            <option value="mecanico">Mecánico</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            placeholder="Contraseña"
            value={nuevoCliente.contraseña}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, contraseña: e.target.value })}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button className="btn-login" type="submit">
            Guardar Cliente
          </button>
          <button
            className="btn-login"
            type="button"
            onClick={() =>
              setNuevoCliente({
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                rol: "",
                contraseña: "",
              })
            }
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearCliente;
