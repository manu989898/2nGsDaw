import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCopy } from "react-icons/fi"; // Ícono para copiar
import api from "../api";

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const responseVehiculos = await api.get("/vehiculos");
        setVehiculos(responseVehiculos.data);

        const responseClientes = await api.get("/usuarios");
        setClientes(responseClientes.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchDatos();
  }, []);

  const columns = ["ID", "Modelo", "Marca", "Año", "Placa", "Quilometraje", "Propietario", "Acciones"];
  const filteredVehiculos = vehiculos.filter((vehiculo) =>
    vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto);
    alert(`Copiado al portapapeles: ${texto}`);
  };

  return (
    <div>
      <h1>Vehículos</h1>

      <div className="buscador-matricula">
        <label htmlFor="matricula" className="etiqueta-matricula">
          <span className="pais">E</span>
        </label>
        <input
          type="text"
          id="matricula"
          placeholder="1234-ABC"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-matricula"
        />
        <button
          className="btn-buscar"
          onClick={() => console.log("Buscar:", searchTerm)}
        >
          Buscar
        </button>
      </div>

      <div className="max-w-[90%] mx-auto my-6 p-4  overflow-x-auto">
      <table className="w-full border-collapse border-none shadow-lg bg-white rounded-lg table-fixed">
    {/* 🔹 Encabezado */}
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="p-4 border w-[5%]">ID</th>
        <th className="p-4 border w-[15%]">Modelo</th>
        <th className="p-4 border w-[10%]">Imagen</th>
        <th className="p-4 border w-[10%]">Año</th>
        <th className="p-4 border w-[10%]">Placa</th>
        <th className="p-4 border w-[10%]">Kilometraje</th>
        <th className="p-4 border w-[20%]">Cliente</th>
        <th className="p-4 border w-[20%]">Acciones</th>
      </tr>
    </thead>

    {/* 🔹 Cuerpo de la Tabla */}
    <tbody>
      {filteredVehiculos.map((vehiculo, index) => {
        const cliente = clientes.find((c) => c.id_usuario === vehiculo.id_cliente);
        const nombreCompleto = cliente
          ? `${cliente.nombre} ${cliente.apellido}`
          : "Cliente no encontrado";

        return (
          <tr 
            key={vehiculo.id_vehiculo} 
            className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-200 transition duration-150`}
          >
            <td className="p-4 text-center border h-16">{vehiculo.id_vehiculo}</td>
            <td className="p-4 text-center border h-16">{vehiculo.modelo}</td>

            {/* 📌 Imagen del vehículo */}
            <td className="p-4 border h-16">
              <div className="flex justify-center items-center">
                <img
                  className="w-12 h-12 rounded-lg shadow-md object-contain"
                  src={`http://localhost:8000/img/${vehiculo.marca}.png`}
                  alt={vehiculo.modelo}
                />
              </div>
            </td>

            <td className="p-4 text-center border h-16">{vehiculo.año}</td>
            <td className="p-4 text-center border h-16">{vehiculo.placa}</td>
            <td className="p-4 text-center border h-16">{vehiculo.quilometraje} Km</td>
            <td className="p-4 text-center border h-16">{nombreCompleto}</td>

            {/* 📌 Botones de acción */}
            <td className="p-4 border h-16">
              <div className="flex justify-center items-center space-x-2 flex-wrap gap-2">
                {/* Botón de Copiar */}
                <button
                  className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow-md"
                  onClick={() => copiarAlPortapapeles(cliente.nombre)}
                  title="Copiar Nombre al portapapeles"
                >
                  📋 Copiar
                </button>
                
                {/* Botón de Editar */}
                <button
                  className="px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-md"
                  onClick={() => navigate(`/editar-vehiculo/${vehiculo.id_vehiculo}`)}
                >
                  ✏️ Editar
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


    </div>
  );
};

export default Vehiculos;
