import React, { useEffect, useState, useRef } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";



//EN DESUSO



const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const navigate = useNavigate();
  const facturasRef = useRef(null); // Ref para la sección de facturas

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/usuarios"); // Ruta para obtener clientes
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const verFacturas = async (cliente) => {
    try {
      const response = await api.get(
        `/usuarios/${cliente.id_usuario}/facturas`
      );
      setClienteSeleccionado(cliente); // Guardamos el objeto completo del cliente seleccionado
      setFacturas(response.data.facturas);

      // Desplazar hacia la sección de facturas
      if (facturasRef.current) {
        facturasRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error al obtener las facturas:", error);
    }
  };

  // Filtrar clientes por nombre
  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por el nombre
  );

  return (
    <div>
      <h1>Clientes</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        className="input-busqueda"
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente.id_usuario}>
              <td>{cliente.id_usuario}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>
                <button onClick={() => verFacturas(cliente)}>
                  Ver Facturas
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {clienteSeleccionado && (
        <div ref={facturasRef}>
          <h2>
            Facturas de {clienteSeleccionado.nombre}{" "}
            {clienteSeleccionado.apellido}
          </h2>
          <table>
            <thead>
              <tr>
                <th>ID Factura</th>
                <th>Monto Total</th>
                <th>Fecha de Emisión</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura) => (
                <tr key={factura.id_factura}>
                  <td>{factura.id_factura}</td>
                  <td>{factura.monto_total}</td>
                  <td>{factura.fecha_emision}</td>
                  <td
                    className={
                      factura.estado === "Pagada"
                        ? "estado-pagada"
                        : factura.estado === "Pendiente"
                        ? "estado-pendiente"
                        : "estado-vencida" // Asume que hay un estado "Vencida"
                    }
                  >
                    {factura.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Clientes;
