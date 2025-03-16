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
    <div className="max-w-[90%] mx-auto my-6 p-4 bg-white rounded-lg shadow-lg">
  <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
    📢 Notificaciones
  </h1>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse border-none">
      {/* 🔹 Encabezado */}
      <thead className="bg-blue-600 text-white">
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-4 text-left uppercase">
              {col.replace("_", " ")}
            </th>
          ))}
        </tr>
      </thead>

      {/* 🔹 Cuerpo de la tabla */}
      <tbody>
        {notificaciones.map((notificacion, index) => (
          <tr
            key={notificacion.id_notificacion}
            className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-200 transition duration-150`}
          >
            {columns.map((col) => (
              <td key={col} className="p-4 text-left">
                {col === "telefono"
                  ? notificacion.usuario?.telefono || "No disponible"
                  : notificacion[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Notificaciones;
