import React, { useState, useEffect, useRef } from "react";
import api from "../api";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [historialGlobal, setHistorialGlobal] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const facturasRef = useRef(null);
  const vehiculosRef = useRef(null);

  // Obtener todos los clientes al cargar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/usuarios");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  // Obtener todos los historiales de servicios globalmente al cargar el componente
  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await api.get("/historial_servicios");
        setHistorialGlobal(response.data);
      } catch (error) {
        console.error("Error al obtener el historial de servicios:", error);
      }
    };

    fetchHistorial();
  }, []);
  // Scroll a la sección de vehículos cuando se cargan los datos
useEffect(() => {
    if (vehiculos.length > 0 && vehiculosRef.current) {
      vehiculosRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [vehiculos]);
  
  // Scroll a la sección de facturas cuando se cargan los datos
  useEffect(() => {
    if (facturas.length > 0 && facturasRef.current) {
      facturasRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [facturas]);
  
  const verFacturas = async (cliente) => {
    try {
      // Si ya están mostrando las facturas para este cliente, no hacer nada
      if (cliente.id_usuario === clienteSeleccionado?.id_usuario && facturas.length > 0) {
        return;
      }
  
      // Actualizar cliente seleccionado y resetear otros datos
      setClienteSeleccionado(cliente);
      setVehiculos([]); // Ocultar vehículos
      setFacturas([]); // Limpiar facturas previas mientras se cargan las nuevas
  
      const response = await api.get(`/usuarios/${cliente.id_usuario}/facturas`);
      setFacturas(response.data.facturas);
  
      // Scroll automático a facturas
      if (facturasRef.current) {
        facturasRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error al obtener las facturas:", error);
    }
  };
  
  const verInformacion = async (cliente) => {
    try {
      // Si ya están mostrando la información para este cliente, no hacer nada
      if (cliente.id_usuario === clienteSeleccionado?.id_usuario && vehiculos.length > 0) {
        return;
      }
  
      // Actualizar cliente seleccionado y resetear otros datos
      setClienteSeleccionado(cliente);
      setFacturas([]); // Ocultar facturas
      setVehiculos([]); // Limpiar vehículos previos mientras se cargan los nuevos
  
      const vehiculosResponse = await api.get(`/usuarios/${cliente.id_usuario}/vehiculos`);
      const vehiculosData = vehiculosResponse.data.vehiculos;
  
      // Vincular historiales de servicios con vehículos
      const vehiculosConHistorial = vehiculosData.map((vehiculo) => {
        const historial = historialGlobal.filter(
          (h) => h.id_vehiculo === vehiculo.id_vehiculo
        );
        return { ...vehiculo, historial };
      });
  
      setVehiculos(vehiculosConHistorial);
  
      // Scroll automático a la sección de vehículos
      if (vehiculosRef.current) {
        vehiculosRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error al obtener la información del cliente:", error);
    }
  };
  

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Clientes</h1>

      <input
        type="text"
        placeholder="Buscar cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input-busqueda"
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
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
              <td>
                <button onClick={() => verInformacion(cliente)}>Ver Información</button>
                <button onClick={() => verFacturas(cliente)}>Ver Facturas</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {clienteSeleccionado && facturas.length > 0 && (
        <div ref={facturasRef}>
          <h2>
            Facturas de {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
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
              {facturas.map((factura) => {
                const monto = parseFloat(factura.monto_total);
                return (
                  <tr key={factura.id_factura}>
                    <td>{factura.id_factura}</td>
                    <td>
                      <span className="dinero">
                        {isNaN(monto) ? "$0.00" : `$${monto.toFixed(2)}`}
                      </span>
                    </td>
                    <td>{factura.fecha_emision}</td>
                    <td
                      className={
                        factura.estado === "Pagada"
                          ? "estado-pagada"
                          : factura.estado === "Pendiente"
                          ? "estado-pendiente"
                          : "estado-vencida"
                      }
                    >
                      {factura.estado}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {clienteSeleccionado && vehiculos.length > 0 && (
        <div ref={vehiculosRef}>
          <h2>
            Vehículos y Servicios de {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
          </h2>
          <div className="vehiculos-container">
            {vehiculos.map((vehiculo) => (
              <div key={vehiculo.id_vehiculo} className="card">
                <h3>
                  {vehiculo.marca} {vehiculo.modelo} ({vehiculo.año})
                </h3>
                <img
                  src={`http://localhost:8000/img/${vehiculo.marca}.png`}
                  alt={vehiculo.modelo}
                  className="imagenMarca"
                />
                <h4>Historial de Servicios</h4>
                {vehiculo.historial.length > 0 ? (
                  <ul>
                    {vehiculo.historial.map((historial) => (
                      <li key={historial.id_historial}>
                        {historial.descripcion} - {historial.fecha} 
                        <span className="dinero">(
                          ${parseFloat(historial.costo_total).toFixed(2)}
                        )</span>
                       
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay historial de servicios disponible.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
