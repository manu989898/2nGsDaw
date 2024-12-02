import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditarCliente = () => {
  const { id } = useParams(); // Obtener ID del cliente desde la URL
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "cliente", // Valor predeterminado
  });

  useEffect(() => {
    // Cargar los datos del cliente
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`);
        setCliente({
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          email: response.data.email,
          telefono: response.data.telefono,
          rol: response.data.rol,
        });
      } catch (error) {
        console.error("Error al cargar los datos del cliente:", error);
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", cliente);

    try {
      await api.put(`/usuarios/${id}`, cliente); // Solo enviamos los campos editables
      alert("Cliente actualizado correctamente.");
      navigate("/clientes"); // Volver a la lista de clientes
      console.log("Datos enviados:", cliente);

    } catch (error) {
      console.error("Error al actualizar el cliente:", error.response);
      console.log("Datos enviados:", cliente);

      alert("No se pudo actualizar el cliente.");
    }
  };

  return (
    <div className="details-section">
      <h1>Editar Cliente</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
        {/* Campos editables */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
        </div>
        <div className="form-group">
  <label htmlFor="rol">Rol:</label>
  <select
    id="rol"
    name="rol"
    value={cliente.rol || "cliente"} // Valor predeterminado
    onChange={handleChange}
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
    <option value="cliente">Cliente</option>
    <option value="mecanico">Mecánico</option>
    <option value="gerente">Gerente</option>
  </select>
</div>

        {/* Botones */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <button className="btn-login" type="submit">Guardar Cambios</button>
          <button className="btn-login" type="button" onClick={() => navigate("/clientes")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarCliente;
