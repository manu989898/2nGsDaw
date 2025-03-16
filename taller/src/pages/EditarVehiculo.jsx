import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditarVehiculo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState({
    marca: "",
    modelo: "",
    placa: "",
    año: "",
    color: "",
    quilometraje: "",
    bastidor: "",
    combustible: "",
    transmision: "",
    id_cliente: null,
  });

  const [cliente, setCliente] = useState({ nombre: "", apellido: "" });

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        const responseVehiculo = await api.get(`/vehiculos/${id}`);
        const vehiculoData = responseVehiculo.data;

        setVehiculo(vehiculoData);

        const responseCliente = await api.get(`/usuarios/${vehiculoData.id_cliente}`);
        setCliente(responseCliente.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchVehiculo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/vehiculos/${id}`, vehiculo);
      alert("✅ Vehículo actualizado correctamente.");
      navigate("/vehiculos");
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
      alert("❌ No se pudo actualizar el vehículo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Editar Vehículo</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Datos del cliente */}
          <div className="form-group">
            <label className="block font-medium text-gray-700">Propietario:</label>
            <input
              type="text"
              value={`${cliente.nombre} ${cliente.apellido}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Datos del vehículo */}
          {[
            { label: "Marca", name: "marca", type: "text" },
            { label: "Modelo", name: "modelo", type: "text" },
            { label: "Placa", name: "placa", type: "text" },
            { label: "Año", name: "año", type: "number" },
            { label: "Color", name: "color", type: "text" },
            { label: "Kilometraje", name: "quilometraje", type: "number" },
            { label: "Bastidor", name: "bastidor", type: "text" },
            { label: "Combustible", name: "combustible", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="form-group">
              <label className="block font-medium text-gray-700">{label}:</label>
              <input
                type={type}
                name={name}
                value={vehiculo[name]}
                onChange={handleChange}
                placeholder={label}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          ))}

          {/* Selector de Transmisión */}
          <div className="form-group">
            <label className="block font-medium text-gray-700">Transmisión:</label>
            <select
              name="transmision"
              value={vehiculo.transmision}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="Manual">Manual</option>
              <option value="Automatica">Automática</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => navigate("/vehiculos")}
              className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarVehiculo;
