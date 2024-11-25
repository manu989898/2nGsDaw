import React, { useEffect, useState } from 'react';
import api from '../api';

const Inventarios = () => {
  const [inventarios, setInventarios] = useState([]);

  useEffect(() => {
    const fetchInventarios = async () => {
      try {
        const response = await api.get('/inventarios');
        setInventarios(response.data);
      } catch (error) {
        console.error('Error al obtener el inventario:', error);
      }
    };

    fetchInventarios();
  }, []);

  const columns = ['id_item', 'nombre_pieza', 'cantidad_disponible', 'costo_unitario', 'ubicacion', 'id_reparacion'];

  return (
    <div>
      <h1>Inventario</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inventarios.map((item) => (
            <tr key={item.id_item}>
              {columns.map((col) => (
                <td key={col}>{item[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventarios;
