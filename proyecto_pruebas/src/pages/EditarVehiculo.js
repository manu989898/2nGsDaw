import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditarVehiculo = () => {
  const { id } = useParams(); // Obtener ID del vehículo desde la URL
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState({
    marca: "",
    modelo: "",
    placa: "",
    año: "",
    color: "",
    id_cliente: null,
  });

  const [cliente, setCliente] = useState({ nombre: "", apellido: "" }); // Información del cliente

  useEffect(() => {
    // Cargar los datos del vehículo y el cliente
    const fetchVehiculo = async () => {
      try {
        // Obtener datos del vehículo
        const responseVehiculo = await api.get(`/vehiculos/${id}`);
        const vehiculoData = responseVehiculo.data;

        setVehiculo(vehiculoData);

        // Obtener datos del cliente asociado al vehículo
        const responseCliente = await api.get(`/usuarios/${vehiculoData.id_cliente}`);
        setCliente(responseCliente.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchVehiculo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/vehiculos/${id}`, vehiculo);
      alert("Vehículo actualizado correctamente.");
      navigate("/vehiculos"); // Volver a la lista de vehículos
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
      alert("No se pudo actualizar el vehículo.");
    }
  };

  return (
    <div className="details-section">
      <h1>Editar Vehículo</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
        {/* Datos del cliente */}
        <div className="form-group">
          <label htmlFor="nombreCliente">Nombre del Propietario:</label>
          <input
            type="text"
            id="nombreCliente"
            value={`${cliente.nombre} ${cliente.apellido}`}
            readOnly
            style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
          />
        </div>

        {/* Datos del vehículo */}
        <div className="form-group">
          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={vehiculo.marca}
            onChange={handleChange}
            placeholder="Marca"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={vehiculo.modelo}
            onChange={handleChange}
            placeholder="Modelo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="placa">Placa:</label>
          <input
            type="text"
            id="placa"
            name="placa"
            value={vehiculo.placa}
            onChange={handleChange}
            placeholder="Placa"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="año">Año:</label>
          <input
            type="number"
            id="año"
            name="año"
            value={vehiculo.año}
            onChange={handleChange}
            placeholder="Año"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={vehiculo.color}
            onChange={handleChange}
            placeholder="Color"
            required
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <button className="btn-login" type="submit">Guardar Cambios</button>
          <button className="btn-login" type="button" onClick={() => navigate("/vehiculos")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarVehiculo;
