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
        setMecanicos(response.data);
        setSelectedMecanico(response.data.length > 0 ? response.data[0].id_mecanico : null);
      } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
      }
    };

    fetchMecanicos();
  }, []);

  // Obtener citas del mecánico seleccionado
  useEffect(() => {
    const fetchCitas = async () => {
      if (selectedMecanico) {
        try {
          setLoading(true);
          const response = await api.get(`/mecanicos/${selectedMecanico}/citas`);
          const sortedCitas = response.data.sort((a, b) => {
            const estadoA = a.reparacion?.estado || "Pendiente";
            const estadoB = b.reparacion?.estado || "Pendiente";

            const order = {
              "En Proceso": 1,
              Pendiente: 2,
              Completada: 3,
            };

            return (order[estadoA] || 4) - (order[estadoB] || 4);
          });
          setCitas(sortedCitas);
        } catch (error) {
          console.error("Error al obtener las citas:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCitas();
  }, [selectedMecanico]);

  return (
    <div className="timeline-module-container">
      <h1>Timeline de Citas</h1>

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
        <p>Cargando citas...</p>
      ) : citas.length === 0 ? (
        <p>No hay citas asignadas para este mecánico.</p>
      ) : (
        <div className="timeline-module">
          {citas.map((cita) => (
            <div
              key={cita.id_cita}
              className={`timeline-module-item ${cita.reparacion?.estado?.toLowerCase() || "pendiente"}`}
            >
              <div className="timeline-module-content">
                <h3>
                  Vehículo: {cita.vehiculo?.modelo} ({cita.vehiculo?.marca})
                </h3>
                <p>
                  <strong>Matrícula:</strong> {cita.vehiculo?.placa}
                </p>
                <p>
                  <strong>Servicio:</strong> {cita.tipo_servicio}
                </p>
                <p>
                  <strong>Fecha/Hora:</strong> {cita.fecha_hora || "No disponible"}
                </p>
                {cita.reparacion ? (
                  <>
                    <p>
                      <strong>Estado de Reparación:</strong> {cita.reparacion.estado}
                    </p>
                    <p>
                      <strong>Notas:</strong> {cita.reparacion.notas}
                    </p>
                    <p>
                      <strong>Progreso:</strong> {cita.reparacion.progreso}%
                    </p>
                  </>
                ) : (
                  <p>
                    <strong>Reparación:</strong> No asignada
                  </p>
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
