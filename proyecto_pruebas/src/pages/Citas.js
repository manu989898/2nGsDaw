import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CrearReparacion from "./CrearReparacion";  // Asegúrate de importar el componente CrearReparacion
import CitasCalendario from "./CitasCalendario"; // Importamos el componente del calendario

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [idMecanicoSeleccionado, setIdMecanicoSeleccionado] = useState(null);
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState(""); // Filtro de estado
  const [fechaFiltro, setFechaFiltro] = useState(""); // Filtro de fecha
  const [mostrarCrearReparacion, setMostrarCrearReparacion] = useState(false); // Nuevo estado para manejar la visibilidad
  const [mostrarCalendario, setMostrarCalendario] = useState(false); // Nuevo estado para cambiar entre vista de tabla y calendario

  const navigate = useNavigate();

  // Obtener citas y mecánicos al cargar el componente
  useEffect(() => {
    async function fetchCitas() {
      try {
        const response = await axios.get("http://localhost:8000/api/citas");
        setCitas(response.data);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    }

    fetchCitas();
  }, []);

  const eliminarCita = async (idCita) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
      return; // Cancelar si el usuario no confirma
    }

    try {
      await axios.delete(`http://localhost:8000/api/citas/${idCita}`);
      alert("Cita eliminada correctamente.");

      // Actualizar la lista de citas después de eliminar
      setCitas((prevCitas) => prevCitas.filter((cita) => cita.id_cita !== idCita));
    } catch (error) {
      console.error("Error al eliminar la cita:", error.response?.data || error);
      alert("No se pudo eliminar la cita.");
    }
  };

  const completarCita = async (idCita) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/citas/${idCita}`,
        {
          estado: "Completada"
        }
      );

      alert("Cita completada correctamente.");
      const updatedCita = response.data.cita;

      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita.id_cita === idCita
            ? { ...cita, estado: "Completada" }
            : cita
        )
      );
    } catch (error) {
      console.error("Error al completar la cita:", error.response?.data || error);
      alert("No se pudo completar la cita.");
    }
  };

  // Filtro por estado y fecha
  useEffect(() => {
    let filtradas = [...citas];

    // Filtro por estado
    if (estadoFiltro) {
      filtradas = filtradas.filter(
        (cita) => cita.estado === estadoFiltro
      );
    }

    // Filtro por fecha
    if (fechaFiltro) {
      filtradas = filtradas.filter(
        (cita) =>
          cita.fecha_hora &&
          new Date(cita.fecha_hora).toISOString().slice(0, 10) === fechaFiltro
      );
    }

    setFilteredCitas(filtradas);
  }, [estadoFiltro, fechaFiltro, citas]);

  return (
    <div>
      <h2>Citas</h2>

      {/* Mostrar filtros solo si no se está mostrando el calendario */}
      {!mostrarCalendario && (
        <div className="asignar-mecanico-container">
          {/* Filtro por estado */}
          <div className="form-group">
            <label htmlFor="estadoFiltro">Filtrar por Estado:</label>
            <select
              id="estadoFiltro"
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="input-busqueda"
            >
              <option value="">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Asignada">Asignada</option>
              <option value="Completada">Completada</option>
            </select>
          </div>

          {/* Filtro por fecha */}
          <div className="form-group">
            <label htmlFor="fechaFiltro">Filtrar por Fecha:</label>
            <input
              type="date"
              id="fechaFiltro"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
              className="input-busqueda"
            />
          </div>
        </div>
      )}

      <div className="centrar-boton">
        <button
          className="btn-login2"
          style={{ marginBottom: "20px" }}
          onClick={() => navigate("/crear-cita")}
        >
          Crear Nueva Cita
        </button>
        <button
          className="btn-login2"
          style={{ marginBottom: "20px", marginLeft: "10px" }}
          onClick={() => setMostrarCrearReparacion(!mostrarCrearReparacion)}
        >
          {mostrarCrearReparacion ? "Ocultar Reparación" : "Crear Reparación"}
        </button>

        {/* Botón para cambiar entre la tabla y el calendario */}
        <button
          className="btn-login2"
          style={{ marginBottom: "20px", marginLeft: "10px" }}
          onClick={() => setMostrarCalendario(!mostrarCalendario)}  // Alterna entre las vistas
        >
          {mostrarCalendario ? "Ver en Tabla" : "Ver en Calendario"}  {/* Cambia el texto según la vista */}
        </button>
      </div>

      {/* Si se debe mostrar el componente CrearReparacion, lo renderizamos */}
      {mostrarCrearReparacion && <CrearReparacion />}

      {/* Mostrar el Calendario si el estado mostrarCalendario es verdadero */}
      {mostrarCalendario ? (
        <CitasCalendario citas={filteredCitas} /> // Pasamos las citas filtradas
      ) : (
        // Mostrar la tabla de citas
        <table>
          <thead>
            <tr>
              <th>ID Cita</th>
              <th>Cliente</th>
              <th>Vehículo</th>
              <th>Placa</th>
              <th>Detalles de la cita</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCitas.map((cita) => (
              <tr key={cita.id_cita}>
                <td>{cita.id_cita}</td>
                <td>
                  {cita.vehiculo?.cliente?.nombre || "Nombre no disponible"}{" "}
                  {cita.vehiculo?.cliente?.apellido || "Apellido no disponible"}
                </td>
                <td>
                  <img
                    className="imagenMarca"
                    src={`http://localhost:8000/img/${cita.vehiculo.marca}.png`}
                    alt={cita.vehiculo.modelo}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{cita.vehiculo.placa || "Sin Detalles"}</td>
                <td>{cita.tipo_servicio || "Sin Detalles"}</td>
                <td>{cita.estado || "Sin Estado"}</td>
                <td>{cita.fecha_hora || "Sin Fecha"}</td>
                <td>
                  <button
                    onClick={() => eliminarCita(cita.id_cita)}
                    style={{ backgroundColor: "red", marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>

                  <button
                    onClick={() => completarCita(cita.id_cita)}
                    style={{ backgroundColor: "green", marginLeft: "10px" }}
                  >
                    Completar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Citas;
