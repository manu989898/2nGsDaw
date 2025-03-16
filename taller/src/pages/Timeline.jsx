import React, { useEffect, useState } from "react";
import api from "../api"; // Make sure you replace this with the actual import if needed

const Timeline = () => {
  const [mecanicos, setMecanicos] = useState([]);
  const [selectedMecanico, setSelectedMecanico] = useState(null);
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchReparaciones = async () => {
      if (selectedMecanico) {
        try {
          setLoading(true);
          const response = await api.get(`/mecanicos/${selectedMecanico}/reparaciones`);
          const sortedReparaciones = response.data.filter((reparacion) => reparacion.id_cita)
            .sort((a, b) => {
              const order = {
                "En Proceso": 1,
                Pendiente: 2,
                Completado: 3,
              };
              return (order[a.estado] || 4) - (order[b.estado] || 4);
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

  const handleEstadoChange = async (idReparacion, nuevoMecanicoEstado) => {
    try {
      await api.put(`/reparaciones/${idReparacion}/estado-mecanico`, {
        mecanicoEstado: nuevoMecanicoEstado,
        progreso: 50
      });

      setReparaciones(prevReparaciones =>
        prevReparaciones.map(reparacion =>
          reparacion.id_reparacion === idReparacion
            ? { ...reparacion, mecanicoEstado: nuevoMecanicoEstado }
            : reparacion
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado del mecánico:", error);
      alert("No se pudo actualizar el estado del mecánico.");
    }
  };

  return (
    <div className="timeline-module-container p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Timeline de Reparaciones</h1>

      <div className="timeline-module-selector mb-6">
        <label htmlFor="mecanico-select" className="text-lg font-medium">Seleccione un Mecánico:</label>
        <select
          id="mecanico-select"
          value={selectedMecanico || ""}
          onChange={(e) => setSelectedMecanico(e.target.value)}
          className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
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
        <p className="text-center">Cargando reparaciones...</p>
      ) : reparaciones.length === 0 ? (
        <p className="text-center">No hay reparaciones asignadas para este mecánico.</p>
      ) : (
        <div className="timeline-module grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reparaciones.map((reparacion) => (
          <div
          key={reparacion.id_reparacion}
          className={` p-4 rounded-lg shadow-md ${
            reparacion.mecanicoEstado === "En Proceso" ? "bg-yellow-300" : ""} 
            ${reparacion.mecanicoEstado === "Completado" ? "bg-green-300" : ""}`}
        >
          <div className="timeline-module-content">
            <h3 className="font-semibold text-lg">
              Vehículo: {reparacion.cita?.vehiculo?.modelo} ({reparacion.cita?.vehiculo?.marca})
            </h3>
            <img
              className="w-16 h-auto rounded-lg shadow-md mb-2"
              src={`http://localhost:8000/img/${reparacion.cita?.vehiculo?.marca}.png`}
              alt={reparacion.cita?.vehiculo?.modelo}
            />
            <p><strong>Matrícula:</strong> {reparacion.cita?.vehiculo?.placa}</p>
            <p><strong>Servicio:</strong> {reparacion.cita?.tipo_servicio}</p>
            <p><strong>Fecha/Hora:</strong> {reparacion.cita?.fecha_hora || "No disponible"}</p>
            <p><strong>Estado del Mecánico:</strong>
              <select
                value={reparacion.mecanicoEstado}
                onChange={(e) => handleEstadoChange(reparacion.id_reparacion, e.target.value)}
                className="mt-2 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
              </select>
            </p>
            <p><strong>Notas:</strong> {reparacion.notas}</p>
            <p><strong>Progreso:</strong> {reparacion.progreso}%</p>
          </div>
        </div>
        
      
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
