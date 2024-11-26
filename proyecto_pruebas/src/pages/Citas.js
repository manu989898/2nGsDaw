import React, { useEffect, useState } from "react";
import axios from "axios";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [idMecanicoSeleccionado, setIdMecanicoSeleccionado] = useState(null);

  useEffect(() => {
    // Obtener citas con relaciones
    axios
      .get("http://localhost:8000/api/citas")
      .then((response) => {
        console.log("Citas obtenidas:", response.data); // Depuración
        setCitas(response.data);
      })
      .catch((error) => console.error("Error al obtener las citas:", error));

    // Obtener mecánicos disponibles
    axios
      .get("http://localhost:8000/api/mecanicos")
      .then((response) => setMecanicos(response.data))
      .catch((error) =>
        console.error("Error al obtener los mecánicos:", error)
      );
  }, []);

  const asignarMecanico = async (idCita) => {
    if (!idMecanicoSeleccionado) {
      alert("Selecciona un mecánico antes de asignar la cita.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/citas/${idCita}/asignar-mecanico`,
        {
          id_mecanico: idMecanicoSeleccionado,
        }
      );
      alert("Mecánico asignado correctamente.");
      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita.id_cita === idCita
            ? { ...cita, estado: "Asignado", mecanico: { id_mecanico: idMecanicoSeleccionado } }
            : cita
        )
      );
    } catch (error) {
      console.error("Error al asignar el mecánico:", error);
      alert("No se pudo asignar el mecánico.");
    }
  };

  const columns = [
    "ID Cita",
    "Cliente",
    "Vehículo",
    "Mecánico",
    "Fecha/Hora",
    "Servicio",
    "Estado",
    "Acciones",
  ];

  return (
    <div>
      <h2>Citas</h2>

      {/* Selector de mecánico */}
      <div className="asignar-mecanico-container">
        <select
          id="mecanico-select"
          onChange={(e) => setIdMecanicoSeleccionado(e.target.value)}
        >
          <option value="">--Seleccionar Mecánico--</option>
          {mecanicos.map((mecanico) => (
            <option key={mecanico.id_mecanico} value={mecanico.id_mecanico}>
              {mecanico.nombre} {mecanico.apellido} (ID: {mecanico.id_mecanico})
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (idMecanicoSeleccionado) {
              alert(`Seleccionaste al mecánico con ID: ${idMecanicoSeleccionado}`);
            } else {
              alert("Por favor, selecciona un mecánico primero.");
            }
          }}
          disabled={!idMecanicoSeleccionado} // Deshabilita el botón si no hay selección
        >
          Seleccionar Mecánico
        </button>
      </div>

      {/* Tabla de citas */}
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id_cita}>
              <td>{cita.id_cita}</td>
              <td>
                {cita.vehiculo?.cliente
                  ? `${cita.vehiculo.cliente.nombre} ${cita.vehiculo.cliente.apellido}`
                  : "Cliente no disponible"}
              </td>
              <td>
                {cita.vehiculo
                  ? `${cita.vehiculo.marca} ${cita.vehiculo.modelo} (${cita.vehiculo.placa})`
                  : "Vehículo no disponible"}
              </td>
              <td>
                {cita.mecanico
                  ? `${cita.mecanico.nombre}`
                  : "No asignado"}
              </td>
              <td>{cita.fecha || "Fecha no disponible"}</td>
              <td>{cita.tipo_servicio || "Servicio no especificado"}</td>
              <td>
                {cita.reparacion?.estado
                  ? cita.reparacion.estado
                  : "Sin reparación"}
              </td>
              <td>
                {cita.estado === "Pendiente" ? (
                  <button onClick={() => asignarMecanico(cita.id_cita)}>
                    Asignar Mecánico
                  </button>
                ) : (
                  "Ya asignado"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Citas;
