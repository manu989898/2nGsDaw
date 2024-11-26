import React, { useEffect, useState } from 'react';
import api from '../api';

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [ordenarPor, setOrdenarPor] = useState(''); // Estado para el criterio de ordenación

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await api.get('/facturas');
        setFacturas(response.data);
      } catch (error) {
        console.error('Error al obtener las facturas:', error);
      }
    };

    fetchFacturas();
  }, []);

  const ordenarFacturas = (criterio) => {
    const facturasOrdenadas = [...facturas].sort((a, b) => {
      if (criterio === 'estado') {
        return a.estado.localeCompare(b.estado);
      } else if (criterio === 'id_cliente') {
        return a.id_cliente - b.id_cliente;
      }
      return 0;
    });
    setFacturas(facturasOrdenadas);
    setOrdenarPor(criterio); // Actualiza el criterio de ordenación seleccionado
  };

  const columns = ['id_factura', 'id_historial', 'id_cliente', 'monto_total', 'fecha_emision', 'estado'];

  return (
    <div>
      <h1>Facturas</h1>

      {/* Botones para ordenar */}
      <div className="botones-ordenacion">
  <button onClick={() => ordenarFacturas('estado')}>Ordenar por Estado</button>
  <button onClick={() => ordenarFacturas('id_cliente')}>Ordenar por ID de Cliente</button>
</div>

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace('_', ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura) => (
            <tr key={factura.id_factura}>
              <td>{factura.id_factura}</td>
              <td>{factura.id_historial}</td>
              <td>{factura.id_cliente}</td>
              <td>${factura.monto_total}</td>
              <td>{factura.fecha_emision}</td>
              <td
                style={{
                  backgroundColor: factura.estado === 'Pagada' ? 'green' : 'red',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {factura.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Facturas;
