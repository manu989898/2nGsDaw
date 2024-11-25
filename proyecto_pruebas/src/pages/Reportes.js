import React, { useEffect, useState } from 'react';
import api from '../api';

const Reportes = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await api.get('/reportes');
        setReportes(response.data);
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      }
    };

    fetchReportes();
  }, []);

  const columns = ['id_reporte', 'titulo', 'descripcion', 'id_usuario', 'fecha_generacion'];

  return (
    <div>
      <h1>Reportes</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id_reporte}>
              <td>{reporte.id_reporte}</td>
              <td>{reporte.titulo}</td>
              <td>{reporte.descripcion}</td>
              <td>{reporte.id_usuario}</td>
              <td>{reporte.fecha_generacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportes;
