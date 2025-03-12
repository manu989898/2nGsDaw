import React, { useEffect, useState } from 'react';
import api from '../api';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await api.get('/notificaciones');
        setNotificaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };

    fetchNotificaciones();
  }, []);

  const columns = ['id_notificacion', 'id_usuario', 'telefono', 'tipo', 'mensaje', 'estado', 'fecha_envio'];

  return (
    <div>
      <h1>Notificaciones</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {notificaciones.map((notificacion) => (
            <tr key={notificacion.id_notificacion}>
              {columns.map((col) => (
                <td key={col}>
                  {col === 'telefono' 
                    ? notificacion.usuario?.telefono || 'No disponible' // Accede al teléfono del usuario
                    : notificacion[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notificaciones;
