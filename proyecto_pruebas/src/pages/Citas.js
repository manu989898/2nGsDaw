import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [idMecanicoSeleccionado, setIdMecanicoSeleccionado] = useState(null);
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState(""); // Filtro de estado


  const navigate = useNavigate();
  
  // Obtener citas y mecánicos al cargar el componente
  useEffect(() => {
    async function fetchCitas(){
      try {
        const response = await axios.get("http://localhost:8000/api/citas");
        setCitas(response.data);
        console.log("Citas:", response.data); // Mostrar las citas en la consola  
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };

    const fetchMecanicos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mecanicos");
        setMecanicos(response.data);
        console.log("Mecánicos:", response.data); // Mostrar los mecánicos en la consola
      } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
      }
    };

    fetchCitas();
    fetchMecanicos();
  }, []);

  // Asignar mecánico a una cita
  const asignarMecanico = async (idCita) => {
    if (!idMecanicoSeleccionado) {
      alert("Selecciona un mecánico antes de asignarlo.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/citas/${idCita}/asignar-mecanico`,
        {
          id_mecanico: idMecanicoSeleccionado,
        }
      );

      alert("Mecánico asignado correctamente.");
      const updatedCita = response.data.cita;
      const updatedMecanico = mecanicos.find(
        (mecanico) => mecanico.id_mecanico === idMecanicoSeleccionado
      );

      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita.id_cita === idCita
            ? { ...cita, mecanico: updatedMecanico }
            : cita
        )
      );
    } catch (error) {
      console.error("Error al asignar el mecánico:", error.response?.data || error);
      alert("No se pudo asignar el mecánico.");
    }
  };
 // Filtro por estado
useEffect(() => {
  let filtradas = [...citas];

  if (estadoFiltro) {
    if (estadoFiltro === "Pendiente") {
      // Mostrar aquellas que no están completadas ni en progreso
      filtradas = filtradas.filter(
        (cita) =>
          cita.reparacion?.estado !== "Completada" &&
          cita.reparacion?.estado !== "En Proceso"
      );
    } else {
      // Filtrar por el estado seleccionado
      filtradas = filtradas.filter(
        (cita) => cita.reparacion?.estado === estadoFiltro
      );
    }
  }

  setFilteredCitas(filtradas);
}, [estadoFiltro, citas]);
  // Asignar reparación a una cita
  const asignarReparacion = async (idCita) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/citas/${idCita}/asignar-reparacion`,
        {
          id_mecanico: idMecanicoSeleccionado || null,
          notas,
          estado,
        }
      );

      alert("Reparación asignada correctamente.");
      const updatedReparacion = response.data.reparacion;

      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita.id_cita === idCita
            ? { ...cita, reparacion: updatedReparacion }
            : cita
        )
      );
    } catch (error) {
      console.error("Error al asignar la reparación:", error.response?.data || error);
      alert("No se pudo asignar la reparación.");
    }
  };
// Función para eliminar una cita
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

  return (
    <div>
      <h2>Citas</h2>
      {/* Filtro por estado */}
      <div className="asignar-mecanico-container">
        <div className="form-group">
          <label htmlFor="estadoFiltro"></label>
          <select
            id="estadoFiltro"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            className="input-busqueda">
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
      {/* Botón para crear una nueva cita */}
      <div className="centrar-boton">
      <button
        className="btn-login2"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/crear-cita")}
      >
        Crear Nueva Cita
      </button>
      </div>
      </div>
      {/* Contenedor de asignación */}
      <div className="asignar-mecanico-container">
        <select
          className="selector-mecanico"
          onChange={(e) => setIdMecanicoSeleccionado(parseInt(e.target.value))}
        >
          <option value="">--Seleccionar Mecánico--</option>
          {mecanicos.map((mecanico) => (
            <option key={mecanico.id_mecanico} value={mecanico.id_mecanico}>
              {mecanico.nombre} {mecanico.apellido}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Notas de reparación"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          className="input-busqueda"
        />

        <select
          className="selector-estado"
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Completada">Completada</option>
        </select>
       
      </div>

      {/* Tabla de citas */}
      <table>
        <thead>
          <tr>
            <th>ID Cita</th>
            <th>Cliente</th>
            <th>Vehículo</th>
            <th>Estado</th>
           
            <th>
  Mecánico
  <span className="info-icon" title="Mecánicos asignados a la reparación vinculada a esta cita.">
    ℹ️
  </span>
</th>

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
      <td>
        <span
          className={
            cita.reparacion?.estado === "Completada"
              ? "estado-completada"
              : cita.reparacion?.estado === "En Proceso"
              ? "estado-en-proceso"
              : cita.reparacion?.estado === "Pendiente"
              ? "estado-pendiente"
              : "estado-sin-reparacion"
          }
        >
          {cita.reparacion?.estado || "Sin reparación"}
        </span>
      </td>
   
      <td>
        {mecanicos
          .filter((mecanico) => mecanico.id_mecanico === cita.reparacion?.id_mecanico)
          .map((mecanico) => (
            <span key={mecanico.id_mecanico}>
              {mecanico.nombre} {mecanico.apellido}
            </span>
          ))}
      </td>
      <td>
        <button onClick={() => asignarMecanico(cita.id_cita)}>
          Asignar Mecánico
        </button>
        <button onClick={() => asignarReparacion(cita.id_cita)}>
          Asignar Reparación
        </button>
        <button
          onClick={() => eliminarCita(cita.id_cita)}
          style={{ backgroundColor: "red", marginLeft: "10px" }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default Citas;
