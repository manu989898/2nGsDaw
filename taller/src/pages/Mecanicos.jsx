import React, { useEffect, useState } from 'react';
import api from '../api';

const Mecanicos = () => {
  const [mecanicos, setMecanicos] = useState([]);

  useEffect(() => {
    const fetchMecanicos = async () => {
      try {
        const response = await api.get('/mecanicos');
        setMecanicos(response.data);
      } catch (error) {
        console.error('Error al obtener los mecánicos:', error);
      }
    };

    fetchMecanicos();
  }, []);

  const columns = ["id", "nombre", "especialidad", "experiencia (años)", "estado"];

  return (
    <div>
      <h1>Mecánicos</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mecanicos.map((mecanico) => (
            <tr key={mecanico.id_mecanico}>
              <td>{mecanico.id_mecanico}</td>
              <td>{mecanico.nombre}</td>
              <td>{mecanico.especialidad}</td>
              <td>{mecanico.experiencia_años}</td>
              <td 
                style={{
                  backgroundColor: mecanico.estado === 'Ocupado' ? 'red' : 'green',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {mecanico.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mecanicos;
