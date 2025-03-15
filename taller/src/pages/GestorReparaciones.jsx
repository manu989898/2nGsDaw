import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../api";
import "../styles/Timeline.css";

const GestorReparaciones = () => {
  const [mecanicos, setMecanicos] = useState([]);
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener lista de mecánicos
  useEffect(() => {
    const fetchMecanicos = async () => {
      try {
        const response = await api.get("/mecanicos");
        setMecanicos(response.data);
      } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
      }
    };

    fetchMecanicos();
  }, []);
  const [searchMatricula, setSearchMatricula] = useState("");
  const reparacionesFiltradas = reparaciones.filter((rep) =>
    rep.cita?.vehiculo?.placa
      ?.toLowerCase()
      .includes(searchMatricula.toLowerCase())
  );

  // Obtener reparaciones
  useEffect(() => {
    const fetchReparaciones = async () => {
      try {
        setLoading(true);
        const response = await api.get("/reparaciones");
        setReparaciones(response.data);
      } catch (error) {
        console.error("Error al obtener las reparaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReparaciones();
  }, []);

  // Función para manejar el movimiento de las reparaciones entre mecánicos
  const onDragEnd = async (result) => {
    if (!result.destination) return; // Si se suelta fuera de un droppable, no hacer nada.

    const { source, destination, draggableId } = result;
    const reparacionId = parseInt(draggableId, 10);

    if (isNaN(reparacionId)) {
      console.error(`ID inválido detectado: ${draggableId}`);
      return;
    }

    // Copiar la lista de reparaciones
    const updatedReparaciones = [...reparaciones];

    // Encontrar la reparación movida
    const movedItemIndex = updatedReparaciones.findIndex(
      (rep) => rep.id_reparacion === reparacionId
    );
    if (movedItemIndex === -1) {
      console.error(`No se encontró la reparación con ID: ${reparacionId}`);
      return;
    }

    const movedItem = updatedReparaciones[movedItemIndex];

    // Si la reparación se mueve dentro del mismo mecánico, reordenar la lista
    if (source.droppableId === destination.droppableId) {
      // Filtrar solo las reparaciones del mismo mecánico
      const reparacionesDelMecanico = updatedReparaciones.filter(
        (rep) => rep.id_mecanico.toString() === source.droppableId
      );

      // Sacar la reparación de su posición original
      reparacionesDelMecanico.splice(source.index, 1);

      // Insertar en la nueva posición
      reparacionesDelMecanico.splice(destination.index, 0, movedItem);

      // Actualizar el estado con el nuevo orden
      const newReparaciones = updatedReparaciones.map((rep) => {
        if (rep.id_mecanico.toString() === source.droppableId) {
          return (
            reparacionesDelMecanico.find(
              (r) => r.id_reparacion === rep.id_reparacion
            ) || rep
          );
        }
        return rep;
      });

      setReparaciones(newReparaciones);
      return; // No se necesita llamar al backend si solo cambiamos el orden
    }

    // Si se mueve a otro mecánico, actualizar el mecánico asignado
    updatedReparaciones[movedItemIndex] = {
      ...movedItem,
      id_mecanico: destination.droppableId,
    };

    setReparaciones(updatedReparaciones); // Actualiza la UI antes de la petición al backend

    try {
      console.log(
        `Enviando actualización al backend: /reparaciones/${reparacionId}/update-mecanico`
      );

      await api.put(`/reparaciones/${reparacionId}/update-mecanico`, {
        id_mecanico: destination.droppableId,
      });

      // 🔹 Opcional: Recargar las reparaciones desde el backend para asegurar que estén bien ordenadas
      const response = await api.get("/reparaciones");
      setReparaciones(response.data);

      console.log("✅ Reparación actualizada correctamente y UI sincronizada");
    } catch (error) {
      console.error("❌ Error al actualizar la reparación en el backend:");

      if (error.response) {
        console.error(`📌 Código de estado: ${error.response.status}`);
        console.error("📌 Respuesta del servidor:", error.response.data);
      } else if (error.request) {
        console.error("📌 No hubo respuesta del servidor:", error.request);
      } else {
        console.error(
          "📌 Error en la configuración de la petición:",
          error.message
        );
      }
    }
  };
  const getEstadoClase = (mecanicoEstado) => {
    switch (mecanicoEstado.toLowerCase()) {
      case "pendiente":
        return "pendiente";
      case "en-proceso":
        return "en-proceso";
      case "completado":
        return "completado";
      default:
        return "";
    }
  };

  const handleEstadoChange = async (idReparacion, nuevoMecanicoEstado) => {
    try {
      console.log(
        `Actualizando estadoMecanico de la reparación ID ${idReparacion} a ${nuevoMecanicoEstado}`
      );

      const response = await api.put(
        `/reparaciones/${idReparacion}/estado-mecanico`,
        {
          mecanicoEstado: nuevoMecanicoEstado,
          progreso: 50,
        }
      );

      if (response.status === 200) {
        setReparaciones((prevReparaciones) =>
          prevReparaciones.map((reparacion) =>
            reparacion.id_reparacion === idReparacion
              ? { ...reparacion, mecanicoEstado: nuevoMecanicoEstado } // Asegurar que se actualiza el estado
              : reparacion
          )
        );
      }

      console.log("Estado actualizado:", response.data);
    } catch (error) {
      console.error(
        "Error al actualizar el estado del mecánico:",
        error.response?.data || error
      );
      alert("No se pudo actualizar el estado del mecánico.");
    }
  };
  const getMecanicoClase = (nombre) => {
    if (nombre.toLowerCase() === "completado") return "mecanico-completado";
    if (nombre.toLowerCase() === "sin asignar") return "mecanico-sin-asignar";
    return "mecanico-default";
  };
  return (
    <div className="timeline-module-container">
      <h1>Timeline de Reparaciones</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por matrícula..."
          value={searchMatricula}
          onChange={(e) => setSearchMatricula(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Cargando reparaciones...</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="timeline-module">
            {mecanicos.map((mecanico) => (
              <Droppable
                key={mecanico.id_mecanico}
                droppableId={mecanico.id_mecanico.toString()}
              >
                {(provided) => (
                  <div
                    className={`timeline-mecanico ${getMecanicoClase(
                      mecanico.nombre
                    )}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2
                      style={{
                        color:
                          mecanico.nombre.toLowerCase() === "completado"
                            ? "green"
                            : mecanico.nombre.toLowerCase() === "sin asignar"
                            ? "goldenrod"
                            : "black",
                      }}
                    >
                      {mecanico.nombre} {mecanico.apellido}
                    </h2>

                    {reparacionesFiltradas
                      .filter((rep) => rep.id_mecanico === mecanico.id_mecanico)
                      .map((reparacion, index) => (
                        <Draggable
                          key={reparacion.id_reparacion.toString()}
                          draggableId={reparacion.id_reparacion.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className={`timeline-module-item timeline-reparacion ${getEstadoClase(
                                reparacion.estado
                              )}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <div
                                {...provided.dragHandleProps}
                                className={`drag-handle ${
                                  reparacion.mecanicoEstado.toLowerCase() ===
                                  "completado"
                                    ? "completado"
                                    : ""
                                }`}
                              >
                                <h3
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  {reparacion.cita?.vehiculo?.placa ||
                                    "Sin Placa"}
                                  <img
                                    className="imagenMarcas"
                                    src={`http://localhost:8000/img/${reparacion.cita?.vehiculo?.marca}.png`}
                                    alt={reparacion.cita?.vehiculo?.modelo}
                                    style={{ width: "50px", height: "auto" }}
                                  />
                                </h3>
                              </div>

                              <p></p>
                              <p>
                                <strong>Servicio:</strong>{" "}
                                {reparacion.cita?.tipo_servicio}
                              </p>
                              <p>
                                <strong>Fecha/Hora:</strong>{" "}
                                {reparacion.cita?.fecha_hora || "No disponible"}
                              </p>
                              <p>
                                <strong>Notas:</strong> {reparacion.notas}
                              </p>
                              <p>
                                <strong>Estado del Mecánico:</strong>
                                <select
                                  value={reparacion.mecanicoEstado} // 🔹 Usamos mecanicoEstado
                                  onChange={(e) =>
                                    handleEstadoChange(
                                      reparacion.id_reparacion,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="En Proceso">En Proceso</option>
                                  <option value="Completado">Completado</option>
                                </select>
                              </p>
                              {/* Barra de progreso */}
                              <div
                                className={`progress-bar ${getEstadoClase(
                                  reparacion.estado
                                )}`}
                              >
                                <div
                                  style={{ width: `${reparacion.progreso}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default GestorReparaciones;
