import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";


const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [historialGlobal, setHistorialGlobal] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [imagenes, setImagenes] = useState({}); // Almacenar imágenes generadas
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook para redirigir
  const facturasRef = useRef(null);
  const vehiculosRef = useRef(null);

  // Obtener todos los clientes al cargar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/usuarios");
        setClientes(response.data);
       // Generar imágenes para cada cliente
       const nuevasImagenes = {};
       response.data.forEach((cliente) => {
         nuevasImagenes[cliente.id_usuario] = `https://randomuser.me/api/portraits/men/${cliente.id_usuario % 100}.jpg`;
       });
       setImagenes(nuevasImagenes);
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
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente.id_usuario}>
              <td>{cliente.id_usuario}</td>
              <td><img
                  className="imagenMarcas"
                  src={imagenes[cliente.id_usuario] || `https://via.placeholder.com/75`}
                  alt={cliente.nombre}
                  style={{ width: "100px", height: "auto", borderRadius: "50%" }}
                /></td>
              <td>{cliente.nombre} {cliente.apellido}</td>
             
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => verInformacion(cliente)}>Ver Información</button>
                <button onClick={() => verFacturas(cliente)}>Ver Facturas</button>
                <button
  onClick={() => navigate(`/editar-cliente/${cliente.id_usuario}`)}
>
  Editar
</button>
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
                          ? "estado-pendientes"
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
                <h4>Datos dle vehiculo</h4>
               
                  <ul>
                    <li>
                      <strong>Placa:</strong> {vehiculo.placa}
                    </li>
                    <li>
                      <strong>Color:</strong> {vehiculo.color}
                    </li>
                    <li>
                      <strong>Quilometraje:</strong> {vehiculo.quilometraje} Km
                    </li>
                    <li>
                      <strong>Transmisión:</strong> {vehiculo.transmision}
                    </li>
                    <li>
                      <strong>Bastidor:</strong> {vehiculo.bastidor}
                    </li>
                    <li>
                    <strong></strong>
          {/* Mostrar icono según el tipo de combustible */}
          {vehiculo.combustible === "Gasolina" && (
  <img
    src="95.jpg"
    alt="Gasolina"
    style={{ width: "40px", height: "auto", marginLeft: "5px" }} // Adjust size here
  />
)}
{vehiculo.combustible === "Diesel" && (
  <img
    src="diesel.jpg"
    alt="Diesel"
    style={{ width: "50px", height: "auto", marginLeft: "5px" }} // Adjust size here
  />
)}
{vehiculo.combustible === "Eléctrico" && (
  <img
    src="electrico.png"
    alt="Eléctrico"
    style={{ width: "35px", height: "auto", marginLeft: "5px" }} // Adjust size here
  />
)}


                    </li>
                  </ul>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
