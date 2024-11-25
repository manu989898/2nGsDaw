import React, { useEffect, useState } from "react";
import axios from "axios";

const Citas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/citas")
      .then(response => setCitas(response.data))
      .catch(error => console.error("Error al obtener las citas:", error));
  }, []);

  const columns = ["id_cita", "id_vehiculo", "id_mecanico", "fecha_hora", "tipo_servicio", "estado"];

  return (
    <div>
      <h2>Citas</h2>
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
              <td>{cita.id_mecanico}</td>
              <td>{cita.fecha_hora}</td>
              <td>{cita.tipo_servicio}</td>
              <td>{cita.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Citas;
