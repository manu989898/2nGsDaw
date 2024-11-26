import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Timeline.css";

const Timeline = () => {
  const [mecanicos, setMecanicos] = useState([]);
  const [selectedMecanico, setSelectedMecanico] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener lista de mecánicos
  useEffect(() => {
    const fetchMecanicos = async () => {
      try {
        const response = await api.get("/mecanicos");
        const data = response.data;
        setMecanicos(data);
        setSelectedMecanico(data.length > 0 ? data[0].id_mecanico : null);
      } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
      }
    };

    fetchMecanicos();
  }, []);

  // Obtener citas del mecánico seleccionado
  useEffect(() => {
    if (selectedMecanico) {
      const fetchCitas = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/mecanicos/${selectedMecanico}/citas`);
          const data = response.data;
          setCitas(data);
        } catch (error) {
          console.error("Error al obtener las citas:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCitas();
    }
  }, [selectedMecanico]);

  // Cambiar estado de reparación
  const handleEstadoChange = async (idReparacion, nuevoEstado) => {
    try {
      await api.patch(`/reparaciones/${idReparacion}`, { estado: nuevoEstado });
      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita.reparacion?.id_reparacion === idReparacion
            ? { ...cita, reparacion: { ...cita.reparacion, estado: nuevoEstado } }
            : cita
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <div className="timeline-container">
      <h1>Timeline de Citas</h1>

      {/* Selector de mecánicos */}
      <div className="selector-mecanicos">
        <label htmlFor="mecanico-select">Seleccione un Mecánico:</label>
        <select
          id="mecanico-select"
          value={selectedMecanico || ""}
          onChange={(e) => setSelectedMecanico(e.target.value)}
        >
          {mecanicos.length === 0 ? (
            <option value="">No hay mecánicos disponibles</option>
          ) : (
            mecanicos.map((mecanico) => (
              <option key={mecanico.id_mecanico} value={mecanico.id_mecanico}>
                {mecanico.nombre} {mecanico.apellido}
              </option>
            ))
          )}
        </select>
      </div>

      {loading ? (
        <p>Cargando citas...</p>
      ) : citas.length === 0 ? (
        <p>No hay citas asignadas para este mecánico.</p>
      ) : (
        <div className="timeline">
          {citas.map((cita) => (
  <div key={cita.id_cita} className="timeline-item">
    <div className="timeline-content">
      <h3>{`Vehículo: ${cita.vehiculo.modelo} (${cita.vehiculo.marca})`}</h3>
      <p><strong>Matrícula:</strong> {cita.vehiculo.placa}</p>
      {cita.reparacion ? (
    <>
        <p><strong>Estado de Reparación:</strong> {cita.reparacion.estado}</p>
        <p><strong>Notas:</strong> {cita.reparacion.notas}</p>
        <p><strong>Progreso:</strong> {cita.reparacion.progreso}%</p>
    </>
) : (
    <p><strong>Reparación:</strong> No asignada</p>
)}
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
