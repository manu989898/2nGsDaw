import React, { useEffect, useState } from 'react';
import api from '../api';

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]); // Estado para los clientes
  const [ordenarPor, setOrdenarPor] = useState('');

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const responseFacturas = await api.get('/facturas');
        setFacturas(responseFacturas.data);

        const responseClientes = await api.get('/usuarios'); // Ruta para obtener clientes
        setClientes(responseClientes.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchDatos();
  }, []);

  const ordenarFacturas = (criterio) => {
    const facturasOrdenadas = [...facturas].sort((a, b) => {
      if (criterio === 'estado') {
        return a.estado.localeCompare(b.estado);
      } else if (criterio === 'nombre_cliente') {
        const clienteA = clientes.find((c) => c.id_usuario === a.id_cliente);
        const clienteB = clientes.find((c) => c.id_usuario === b.id_cliente);

        const nombreA = clienteA ? `${clienteA.nombre} ${clienteA.apellido}` : '';
        const nombreB = clienteB ? `${clienteB.nombre} ${clienteB.apellido}` : '';

        return nombreA.localeCompare(nombreB);
      } else if (criterio === 'fecha_emision') {
        return new Date(a.fecha_emision) - new Date(b.fecha_emision);
      }
      return 0;
    });

    setFacturas(facturasOrdenadas);
    setOrdenarPor(criterio);
  };

  const columns = ['id_factura', 'id_historial', 'cliente', 'monto_total', 'fecha_emision', 'estado'];

  return (
    <div>
      <h1>Facturas</h1>

      <div className="botones-ordenacion">
        <button onClick={() => ordenarFacturas('estado')}>Ordenar por Estado</button>
        <button onClick={() => ordenarFacturas('nombre_cliente')}>Ordenar por Nombre de Cliente</button>
        <button onClick={() => ordenarFacturas('fecha_emision')}>Ordenar por Fecha de Emisión</button>
      </div>

      {ordenarPor && (
        <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#007bff' }}>
          Ordenando por: <span>{ordenarPor.replace('_', ' ').toUpperCase()}</span>
        </p>
      )}

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace('_', ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura) => {
            const cliente = clientes.find((c) => c.id_usuario === factura.id_cliente); // Busca el cliente
            const nombreCompleto = cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente no encontrado';

            return (
              <tr key={factura.id_factura}>
                <td>{factura.id_factura}</td>
                <td>{factura.id_historial}</td>
                <td>{nombreCompleto}</td> {/* Muestra el nombre completo */}
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Facturas;
