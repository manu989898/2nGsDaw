import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CrearReparacion = () => {
  const [citas, setCitas] = useState([]); // Lista de citas disponibles
  const [idCita, setIdCita] = useState(""); // Cita seleccionada
  const [notas, setNotas] = useState(""); // Notas de la reparación
  const [estado, setEstado] = useState("En Proceso"); // Estado de la reparación
  const [fechaInicio, setFechaInicio] = useState(""); // Fecha de inicio
  const [fechaFin, setFechaFin] = useState(""); // Fecha de finalización opcional
  const [vehiculos, setVehiculos] = useState([]); // Lista de vehículos
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citasResponse = await api.get("/citas");
        setCitas(citasResponse.data);
        const vehiculosResponse = await api.get("/vehiculos");
        setVehiculos(vehiculosResponse.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idCita || !estado || !fechaInicio) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    try {
      const response = await api.post("/reparaciones", {
        id_cita: idCita,
        id_mecanico: 9, // Siempre se enviará el mecánico con ID 9
        notas,
        estado,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin || null,
      });
      alert("Reparación creada correctamente.");
      console.log("Reparación creada:", response.data);
      await api.put(`/citas/${idCita}`, { estado: "Asignada" });
      setIdCita("");
      setNotas("");
      setEstado("En Proceso");
      setFechaInicio("");
      setFechaFin("");
      navigate("/reparaciones");
    } catch (error) {
      console.error("Error al crear la reparación:", error);
      alert("No se pudo crear la reparación. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="details-section">
      <h1>Crear Reparación</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="idCita">Seleccionar Cita:</label>
          <select
            id="idCita"
            value={idCita}
            onChange={(e) => setIdCita(e.target.value)}
            className="input-busqueda"
            required
          >
            <option value="">-- Seleccionar Cita --</option>
            {citas.filter((cita) => cita.estado === "Pendiente").map((cita) => (
              <option key={cita.id_cita} value={cita.id_cita}>
                {`Cita ${cita.id_cita} - Vehículo: ${vehiculos.find(
                  (vehiculo) => vehiculo.id_vehiculo === cita.id_vehiculo
                )?.placa.toUpperCase()} `}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="notas">Notas:</label>
          <textarea
            id="notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className="input-busqueda"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="input-busqueda"
          >
            <option value="En Proceso">En Proceso</option>
            <option value="Completada">Completada</option>
            <option value="Sin asignar">Sin Asignar</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input
            type="datetime-local"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="input-busqueda"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaFin">Fecha de Finalización (Opcional):</label>
          <input
            type="datetime-local"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="input-busqueda"
          />
        </div>
        <div className="centrar-boton">
          <button className="btn-login2" type="submit">
            Crear Reparación
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearReparacion;
