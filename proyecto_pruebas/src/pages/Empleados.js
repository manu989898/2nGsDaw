import React, { useEffect, useState } from 'react';
import api from '../api'; // Asegúrate de que 'api' esté correctamente configurado

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await api.get('/empleados'); // Ruta de la API para obtener empleados
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <div>
      <h1>Empleados</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>DNI</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.id}</td>
              <td>{empleado.email}</td>
              <td>{empleado.dni}</td>
              <td>{new Date(empleado.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleados;
