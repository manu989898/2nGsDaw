import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Timeline.css";

const Timeline = () => {
  const [mecanicos, setMecanicos] = useState([]);
  const [selectedMecanico, setSelectedMecanico] = useState(null);
  const [reparaciones, setReparaciones] = useState([]); // Cambiar citas por reparaciones
  const [loading, setLoading] = useState(true);

  // Obtener lista de mecánicos
  useEffect(() => {
    const fetchMecanicos = async () => {
      try {
        const response = await api.get("/mecanicos");
        setMecanicos(response.data);
        setSelectedMecanico(
          response.data.length > 0 ? response.data[0].id_mecanico : null
        );
      } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
      }
    };

    fetchMecanicos();
  }, []);

  // Obtener reparaciones del mecánico seleccionado
  useEffect(() => {
    const fetchReparaciones = async () => {
      if (selectedMecanico) {
        try {
          setLoading(true);
          const response = await api.get(
            `/mecanicos/${selectedMecanico}/reparaciones`
          );
          const sortedReparaciones = response.data
            .filter((reparacion) => reparacion.id_cita) // Filtrar solo las reparaciones que tienen id_cita
            .sort((a, b) => {
              const estadoA = a.estado || "Pendiente";
              const estadoB = b.estado || "Pendiente";

              const order = {
                "En Proceso": 1,
                Pendiente: 2,
                Completada: 3,
              };

              return (order[estadoA] || 4) - (order[estadoB] || 4);
            });
          setReparaciones(sortedReparaciones);
        } catch (error) {
          console.error("Error al obtener las reparaciones:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReparaciones();
  }, [selectedMecanico]);

  const normalizeEstado = (estado) => {
    if (!estado) return "sin-asignar"; // Predeterminado si no hay estado
    return estado.toLowerCase().replace(/\s+/g, '-'); // Convertir a minúsculas y reemplazar espacios por guiones
  };

  // Manejar la actualización del estado de la reparación
  const handleEstadoChange = async (idReparacion, nuevoEstado) => {
    try {
        console.log(`Actualizando estado de la reparación ID ${idReparacion} a ${nuevoEstado}`);
        
        const fechaFinFormateada = nuevoEstado === "Completada" ? new Date().toISOString().slice(0, 19).replace('T', ' ') : null;

        // Llamada a la API para actualizar el estado
        const response = await api.put(`/reparaciones/${idReparacion}`, {
          estado: nuevoEstado,
          // Si el nuevo estado es "Completada", se actualiza la fecha de fin
          fecha_fin: fechaFinFormateada,
          // Si el nuevo estado es "Completada", se actualiza el progreso a 100
          progreso: nuevoEstado === "Completada" ? 100 : 0,
        });
        const updatedReparacion = response.data.reparacion;

        // Actualizar la lista de reparaciones
        setReparaciones((prevReparaciones) =>
            prevReparaciones.map((reparacion) =>
                reparacion.id_reparacion === idReparacion
                    ? { ...reparacion, estado: updatedReparacion.estado }
                    : reparacion
            )
        );

        alert("Estado actualizado correctamente.");
        console.log('Respuesta del servidor:', response.data);
    } catch (error) {
        console.error("Error al actualizar el estado de la reparación:", error.response?.data || error);
        alert("No se pudo actualizar el estado de la reparación.");
    }
};

  
  return (
    <div className="timeline-module-container">
      <h1>Timeline de Reparaciones</h1>

      <div className="timeline-module-selector">
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
        <p>Cargando reparaciones...</p>
      ) : reparaciones.length === 0 ? (
        <p>No hay reparaciones asignadas para este mecánico.</p>
      ) : (
        <div className="timeline-module">
          {reparaciones.map((reparacion) => (
            <div
              key={reparacion.id_reparacion}
              className={`timeline-module-item ${normalizeEstado(reparacion.estado)}`}
            >
              <div className="timeline-module-content">
                <h3>
                  Vehículo: {reparacion.cita?.vehiculo?.modelo} ({reparacion.cita?.vehiculo?.marca})
                </h3>
                <p>
                  <strong>Matrícula:</strong> {reparacion.cita?.vehiculo?.placa}
                </p>
                <p>
                  <strong>Servicio:</strong> {reparacion.cita?.tipo_servicio}
                </p>
                <p>
                  <strong>Fecha/Hora:</strong> {reparacion.cita?.fecha_hora || "No disponible"}
                </p>
                <p>
                  <strong>Estado de Reparación:</strong>{" "}
                  <select
                    value={reparacion.estado}
                    onChange={(e) =>
                      handleEstadoChange(reparacion.id_reparacion, e.target.value)
                    }
                  >
                    <option value="Sin asignar">Sin asignar</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completada">Completada</option>
                  </select>
                </p>
                <p>
                  <strong>Notas:</strong> {reparacion.notas}
                </p>
                <p>
                  <strong>Progreso:</strong> {reparacion.progreso}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
