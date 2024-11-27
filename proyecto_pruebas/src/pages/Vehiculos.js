import React, { useEffect, useState } from "react";
import api from "../api";

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const responseVehiculos = await api.get("/vehiculos");
        setVehiculos(responseVehiculos.data);

        const responseClientes = await api.get("/usuarios"); // Ruta para obtener clientes
        setClientes(responseClientes.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchDatos();
  }, []);

  const columns = ["id", "modelo", "marca", "año", "placa", "propietario"];

  // Filtrar vehículos por matrícula
  const filteredVehiculos = vehiculos.filter((vehiculo) =>
    vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Vehículos</h1>

      {/* Buscador con estilo de matrícula */}
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
              <th key={col}>{col.replace("_", " ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredVehiculos.map((vehiculo) => {
            const cliente = clientes.find(
              (c) => c.id_usuario === vehiculo.id_cliente
            ); // Busca el cliente por ID
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
                <td>
                  <div className="placa-container">
                    <span className="placa-texto">{vehiculo.placa}</span>
                  </div>
                </td>
                {/* Mostrar la placa */}
                <td>{nombreCompleto}</td> {/* Mostrar el nombre completo */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Vehiculos;
