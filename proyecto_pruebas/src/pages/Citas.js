import React, { useEffect, useState } from "react";
import axios from "axios";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [idMecanicoSeleccionado, setIdMecanicoSeleccionado] = useState(null);
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState("Pendiente");

  // Obtener citas y mecánicos al cargar el componente
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/citas")
      .then((response) => setCitas(response.data))
      .catch((error) => console.error("Error al obtener las citas:", error));

    axios
      .get("http://localhost:8000/api/mecanicos")
      .then((response) => setMecanicos(response.data))
      .catch((error) => console.error("Error al obtener los mecánicos:", error));
  }, []);

  // Asignar reparación a una cita
  const asignarReparacion = async (idCita) => {
    if (!idMecanicoSeleccionado) {
      alert("Selecciona un mecánico antes de asignar la reparación.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/citas/${idCita}/asignar-reparacion`,
        {
          id_mecanico: idMecanicoSeleccionado,
          notas,
          estado,
        }
      );
      alert("Reparación asignada correctamente.");
      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita.id_cita === idCita
            ? { ...cita, reparacion: response.data.reparacion }
            : cita
        )
      );
    } catch (error) {
      console.error("Error al asignar la reparación:", error);
      alert("No se pudo asignar la reparación.");
    }
  };

  return (
    <div>
      <h2>Citas</h2>

      {/* Contenedor de asignación */}
      <div className="asignar-mecanico-container">
        <select
          className="selector-mecanico"
          onChange={(e) => setIdMecanicoSeleccionado(e.target.value)}
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id_cita}>
              <td>{cita.id_cita}</td>
              <td>{cita.vehiculo?.cliente?.nombre || "Cliente no disponible"}</td>
              <td>
                {cita.vehiculo
                  ? `${cita.vehiculo.marca} ${cita.vehiculo.modelo}`
                  : "Vehículo no disponible"}
              </td>
              <td>
                <span
                  className={
                    cita.reparacion?.estado === "Completada"
                      ? "estado-pagada"
                      : cita.reparacion?.estado === "En Proceso"
                      ? "estado-pendiente"
                      : "estado-vencida"
                  }
                >
                  {cita.reparacion?.estado || "Sin reparación"}
                </span>
              </td>
              <td>
                <button onClick={() => asignarReparacion(cita.id_cita)}>
                  Asignar Reparación
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
