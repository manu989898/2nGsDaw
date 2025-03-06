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

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredVehiculos.map((vehiculo) => {
            const cliente = clientes.find(
              (c) => c.id_usuario === vehiculo.id_cliente
            );
            const nombreCompleto = cliente
              ? `${cliente.nombre} ${cliente.apellido}`
              : "Cliente no encontrado";

            return (
              <tr key={vehiculo.id}>
                <td>{vehiculo.id_vehiculo}</td>
                <td>{vehiculo.modelo}</td>
                <td>
                  <img
                    className="imagenMarcas"
                    src={`http://localhost:8000/img/${vehiculo.marca}.png`}
                    alt={vehiculo.modelo}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>{vehiculo.año}</td>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.quilometraje} Km</td> 
                <td>
                  {nombreCompleto}
                  
                </td>
                <td>
                  <button
                    className="btn-copy"
                    onClick={() => copiarAlPortapapeles(cliente.email)}
                    title="Copiar EMAIL al portapapeles"
                  >
                    Copiar <FiCopy />
                  </button>
                  <button
                    className="btn-copy"
                    onClick={() => navigate(`/editar-vehiculo/${vehiculo.id_vehiculo}`)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Vehiculos;
