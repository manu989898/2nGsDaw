import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
          setCitas(response.data);
        } catch (error) {
          console.error("Error al obtener las citas:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCitas();
  }, [selectedMecanico]);

  // Manejar el movimiento de las tarjetas
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Reordenar citas dentro del mismo mecánico
    const reorderedCitas = Array.from(citas);
    const [movedCita] = reorderedCitas.splice(source.index, 1);
    reorderedCitas.splice(destination.index, 0, movedCita);

    setCitas(reorderedCitas);

    // Actualizar el backend con el nuevo orden (opcional)
    // Aquí puedes enviar la solicitud al servidor para guardar el orden actualizado.
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="timeline">
            {(provided) => (
              <div
                className="timeline"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {citas.map((cita, index) => (
                  <Draggable
                    key={cita.id_cita}
                    draggableId={`cita-${cita.id_cita}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="timeline-item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="timeline-content">
                          <h3>
                            Vehículo: {cita.vehiculo?.modelo} (
                            {cita.vehiculo?.marca})
                          </h3>
                          <p>
                            <strong>Matrícula:</strong> {cita.vehiculo?.placa}
                          </p>
                          <p>
                            <strong>Servicio:</strong> {cita.tipo_servicio}
                          </p>
                          <p>
                            <strong>Fecha/Hora:</strong>{" "}
                            {cita.fecha_hora || "No disponible"}
                          </p>
                          {cita.reparacion ? (
                            <>
                              <p>
                                <strong>Estado de Reparación:</strong>{" "}
                                {cita.reparacion.estado}
                              </p>
                              <p>
                                <strong>Notas:</strong>{" "}
                                {cita.reparacion.notas}
                              </p>
                              <p>
                                <strong>Progreso:</strong>{" "}
                                {cita.reparacion.progreso}%
                              </p>
                            </>
                          ) : (
                            <p>
                              <strong>Reparación:</strong> No asignada
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default Timeline;
