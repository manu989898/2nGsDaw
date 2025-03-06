import React, { useEffect, useState } from 'react';
import api from '../api';

const HistorialServicios = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await api.get('/historial_servicios');
        setHistorial(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de servicios:', error);
      }
    };

    fetchHistorial();
  }, []);

  const columns = ['id_historial', 'id_vehiculo', 'fecha', 'descripcion', 'id_reparacion', 'costo_total'];

  return (
    <div>
      <h1>Historial de Servicios</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {historial.map((item) => (
            <tr key={item.id_historial}>
              <td>{item.id_historial}</td>
              <td>{item.id_vehiculo}</td>
              <td>{item.fecha}</td>
              <td>{item.descripcion}</td>
              <td>{item.id_reparacion}</td>
              <td>${item.costo_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialServicios;
