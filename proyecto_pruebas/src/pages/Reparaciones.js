import React, { useEffect, useState } from 'react';
import api from '../api';

const Reparaciones = () => {
  const [reparaciones, setReparaciones] = useState([]);

  useEffect(() => {
    const fetchReparaciones = async () => {
      try {
        const response = await api.get('/reparaciones');
        setReparaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las reparaciones:', error);
      }
    };

    fetchReparaciones();
  }, []);

  const columns = ['id_reparacion', 'id_cita', 'progreso', 'estado', 'notas', 'fecha_inicio', 'fecha_fin'];

  return (
    <div>
      <h1>Reparaciones</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reparaciones.map((reparacion) => (
            <tr key={reparacion.id_reparacion}>
              <td>{reparacion.id_reparacion}</td>
              <td>{reparacion.id_cita}</td>
              <td>
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '5px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${reparacion.progreso}%`,
                      backgroundColor: reparacion.progreso === 100 ? 'green' : 'orange',
                      height: '10px',
                    }}
                  ></div>
                </div>
                {reparacion.progreso}%
              </td>
              <td
                style={{
                  backgroundColor: reparacion.estado === 'Completada' ? 'green' : 'yellow',
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {reparacion.estado}
              </td>
              <td>{reparacion.notas}</td>
              <td>{reparacion.fecha_inicio}</td>
              <td>{reparacion.fecha_fin || 'Pendiente'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reparaciones;
