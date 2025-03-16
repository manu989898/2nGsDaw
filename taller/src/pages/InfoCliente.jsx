import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [imagenes, setImagenes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const facturasRef = useRef(null);
  const vehiculosRef = useRef(null);

  // Obtener clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/usuarios");
        setClientes(response.data);

        // Generar imágenes aleatorias
        const nuevasImagenes = {};
        response.data.forEach((cliente) => {
          nuevasImagenes[
            cliente.id_usuario
          ] = `https://randomuser.me/api/portraits/men/${
            cliente.id_usuario % 100
          }.jpg`;
        });
        setImagenes(nuevasImagenes);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  // Obtener facturas de un cliente
  const verFacturas = async (cliente) => {
    try {
      setClienteSeleccionado(cliente);
      setVehiculos([]);
      setFacturas([]); // Limpia antes de cargar nuevas

      const response = await api.get(
        `/usuarios/${cliente.id_usuario}/facturas`
      );
      setFacturas(response.data.facturas || []);

      if (facturasRef.current) {
        facturasRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      alert(`❌ No hay facturas para ${cliente.nombre} ${cliente.apellido}`);
      setFacturas([]);
    }
  };

  // Obtener vehículos de un cliente
  const verInformacion = async (cliente) => {
    try {
      setClienteSeleccionado(cliente);
      setFacturas([]);
      setVehiculos([]); // Limpia antes de cargar nuevas

      const response = await api.get(
        `/usuarios/${cliente.id_usuario}/vehiculos`
      );
      setVehiculos(response.data.vehiculos || []);

      setTimeout(() => {
        if (vehiculosRef.current) {
          vehiculosRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Pequeño delay para asegurar el render antes del scroll
    } catch (error) {
      alert(`❌ No hay vehículos para ${cliente.nombre} ${cliente.apellido}`);
      setVehiculos([]);
    }
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Clientes
      </h1>

      {/* Campo de búsqueda */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar cliente por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="max-w-[90%] mx-auto my-6 p-4  overflow-x-auto">
        <table className="w-full border-collapse border table-fixed">
          {/* 🔹 Encabezado de la Tabla */}
          <thead className="bg-blue-600 text-white text-center">
            <tr>
              <th className="p-4 border w-[5%]">Número</th>
              <th className="p-4 border w-[10%]">Imagen</th>
              <th className="p-4 border w-[15%]">Nombre</th>
              <th className="p-4 border w-[20%]">Email</th>
              <th className="p-4 border w-[15%]">Teléfono</th>
              <th className="p-4 border w-[20%]">Dirección</th>{" "}
              {/* Nueva columna de Dirección */}
              <th className="p-4 border w-[25%]">Acciones</th>
            </tr>
          </thead>

          {/* 🔹 Cuerpo de la Tabla */}
          <tbody>
            {filteredClientes.map((cliente, index) => (
              <tr
                key={cliente.id_usuario}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition duration-150`}
              >
                <td className="p-4 text-center border h-16">
                  {cliente.id_usuario}
                </td>
                {/* 📌 Celda de imagen bien alineada */}
                <td className="border h-16">
                  <div className="flex justify-center items-center">
                    <img
                      src={imagenes[cliente.id_usuario]}
                      alt="Perfil"
                      className="w-12 h-12 rounded-full object-cover shadow-md"
                    />
                  </div>
                </td>
                <td className="p-4 text-center border h-16">
                  {cliente.nombre} {cliente.apellido}
                </td>
                <td className="p-4 text-center border h-16">{cliente.email}</td>
                <td className="p-4 text-center border h-16">
                  {cliente.telefono || "N/D"}
                </td>
                <td className="p-4 text-center">
                  {cliente.direccion || "Sin Dirección"}
                </td>{" "}
                {/* Nueva columna de Dirección */}
                {/* 📌 Botones alineados correctamente en el centro */}
                <td className="p-4 border h-16">
                  <div className="flex justify-center items-center space-x-2 flex-wrap gap-2">
                    <button
                      onClick={() => verInformacion(cliente)}
                      className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow-md flex items-center space-x-1"
                    >
                      <span>🚗</span> <span> Vehiculos</span>
                    </button>

                    <button
                      onClick={() => verFacturas(cliente)}
                      className="px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow-md flex items-center space-x-1"
                    >
                      <span>📄</span> <span> Facturas</span>
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/editar-cliente/${cliente.id_usuario}`)
                      }
                      className="px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-md flex items-center space-x-1"
                    >
                      <span>✏️</span> <span>Editar</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sección de Facturas */}
      {clienteSeleccionado && facturas.length > 0 && (
        <div ref={facturasRef} className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">
            Facturas de {clienteSeleccionado.nombre}{" "}
            {clienteSeleccionado.apellido}
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left">ID Factura</th>
                  <th className="p-4 text-left">Monto Total</th>
                  <th className="p-4 text-left">Fecha de Emisión</th>
                  <th className="p-4 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((factura) => (
                  <tr key={factura.id_factura} className="hover:bg-gray-100">
                    <td className="p-4">{factura.id_factura}</td>
                    <td className="p-4">
                      ${Number(factura.monto_total).toFixed(2)}
                    </td>
                    <td className="p-4">{factura.fecha_emision}</td>
                    <td
                      className={`p-4 border ${
                        factura.estado === "Pagada"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {factura.estado}
                    </td>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {clienteSeleccionado && vehiculos.length > 0 && (
        <div ref={vehiculosRef}>
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Vehículos de {clienteSeleccionado.nombre}{" "}
            {clienteSeleccionado.apellido}
          </h2>
          <div className="vehiculos-container">
            {vehiculos.map((vehiculo) => (
              <div key={vehiculo.id_vehiculo} className="card">
                <h3>
                  {vehiculo.marca} {vehiculo.modelo} ({vehiculo.año})
                </h3>

                <img
                  src={`http://localhost:8000/img/${vehiculo.marca}.png`}
                  alt={vehiculos[0].modelo}
                  className="w-24 mx-auto my-3"
                />
                <h4>Datos del vehículo</h4>

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
                </ul>
                <button
                  onClick={() =>
                    navigate(`/editar-vehiculo/${vehiculos[0].id_vehiculo}`)
                  }
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
