import React, { useEffect, useState } from "react";
import axios from "axios";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [idMecanicoSeleccionado, setIdMecanicoSeleccionado] = useState(null);

  useEffect(() => {
    // Obtener citas
    axios
      .get("http://localhost:8000/api/citas")
      .then((response) => setCitas(response.data))
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

    /*
    try {
      const response = await axios.put(
        `http://localhost:8000/api/citas/${idCita}/asignar-mecanico`,
        {
          id_mecanico: idMecanicoSeleccionado,
        }
      );
      alert("Mecánico asignado correctamente.");
      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita.id_cita === idCita
            ? { ...cita, estado: "Asignado", id_mecanico: idMecanicoSeleccionado }
            : cita
        )
      );
    } catch (error) {
      console.error("Error al asignar el mecánico:", error);
      alert("No se pudo asignar el mecánico.");
    }
  };
  */
};

  const columns = [
    "id_cita",
    "id_vehiculo",
    "id_mecanico",
    "fecha_hora",
    "tipo_servicio",
    "estado",
    "acciones",
  ];

  return (
    <div>
      <h2>Citas</h2>

      <div className="asignar-mecanico-container">
  <select
    id="mecanico-select"
    onChange={(e) => setIdMecanicoSeleccionado(e.target.value)}
  >
    <option value="">--Seleccionar Mecánico--</option>
    {mecanicos.map((mecanico) => (
      <option key={mecanico.id_mecanico} value={mecanico.id_mecanico}>
        {mecanico.nombre} (ID: {mecanico.id_mecanico})
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


      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id_cita}>
              <td>{cita.id_cita}</td>
              <td>{cita.id_vehiculo}</td>
              <td>{cita.id_mecanico || "No asignado"}</td>
              <td>{cita.fecha_hora}</td>
              <td>{cita.tipo_servicio}</td>
              <td>{cita.estado}</td>
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
