import React, { useEffect, useState } from 'react';
import api from '../api';

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await api.get('/vehiculos');
        setVehiculos(response.data);
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    };

    fetchVehiculos();
  }, []);

  const columns = ["id", "modelo", "marca", "año", "propietario"];

  return (
    <div>
      <h1>Vehículos</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id_vehiculo}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.año}</td>
              <td>{vehiculo.id_cliente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vehiculos;
