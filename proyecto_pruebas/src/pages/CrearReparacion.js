import React, { useState, useEffect } from "react";
import api from "../api";

const CrearReparacion = () => {
  const [citas, setCitas] = useState([]); // Lista de citas disponibles
  const [mecanicos, setMecanicos] = useState([]); // Lista de mecánicos
  const [idCita, setIdCita] = useState(""); // Cita seleccionada
  const [idMecanico, setIdMecanico] = useState(""); // Mecánico seleccionado
  const [notas, setNotas] = useState(""); // Notas de la reparación
  const [estado, setEstado] = useState("En Proceso"); // Estado de la reparación
  const [fechaInicio, setFechaInicio] = useState(""); // Fecha de inicio
  const [fechaFin, setFechaFin] = useState(""); // Fecha de finalización opcional
  const [vehiculos, setVehiculos] = useState([]); // Lista de vehículos

  // Cargar citas y mecánicos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener citas desde la API
        const citasResponse = await api.get("/citas");
        setCitas(citasResponse.data);

        // Obtener mecánicos desde la API
        const mecanicosResponse = await api.get("/mecanicos");
        setMecanicos(mecanicosResponse.data);

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

    // Validar campos requeridos
    if (!idCita || !idMecanico || !estado || !fechaInicio) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      // Enviar datos a la API para crear la reparación
      const response = await api.post("/reparaciones", {
        id_cita: idCita,
        id_mecanico: idMecanico,
        notas,
        estado,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin || null, // Fecha fin opcional
      });

      alert("Reparación creada correctamente.");
      console.log("Reparación creada:", response.data);

      // Reiniciar los campos del formulario
      setIdCita("");
      setIdMecanico("");
      setNotas("");
      setEstado("En Proceso");
      setFechaInicio("");
      setFechaFin("");
    } catch (error) {
      console.error("Error al crear la reparación:", error);
      alert("No se pudo crear la reparación. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="details-section">
      <h1>Crear Reparación</h1>

      <form onSubmit={handleSubmit}>
        {/* Selector de cita */}
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
            {citas.map((cita) => (
              <option key={cita.id_cita} value={cita.id_cita}>
                {`Cita ${cita.id_cita} - Vehículo: ${vehiculos.find((vehiculo) => vehiculo.id_vehiculo === cita.id_vehiculo)?.placa} `}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de mecánico */}
        <div className="form-group">
          <label htmlFor="idMecanico">Asignar Mecánico:</label>
          <select
            id="idMecanico"
            value={idMecanico}
            onChange={(e) => setIdMecanico(e.target.value)}
            className="input-busqueda"
            required
          >
            <option value="">-- Seleccionar Mecánico --</option>
            {mecanicos.map((mecanico) => (
              <option key={mecanico.id_mecanico} value={mecanico.id_mecanico}>
                {`${mecanico.nombre}`}
              </option>
            ))}
          </select>
        </div>

        {/* Notas */}
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

        {/* Estado */}
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
          </select>
        </div>

        {/* Fechas */}
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

        {/* Botón de envío */}
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
