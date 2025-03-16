import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api.jsx";

const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    rol: "cliente",
  });

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`);
        setCliente(response.data);
      } catch (error) {
        console.error("Error al cargar los datos del cliente:", error);
      }
    };
    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuarios/${id}`, cliente);
      alert("✅ Cliente actualizado correctamente.");
      navigate("/clientes");
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      alert("❌ No se pudo actualizar el cliente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Editar Cliente</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos editables */}
          {[
            { label: "Nombre", name: "nombre", type: "text" },
            { label: "Apellido", name: "apellido", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Teléfono", name: "telefono", type: "text" },
            { label: "Dirección", name: "direccion", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="form-group">
              <label className="block font-medium text-gray-700">{label}:</label>
              <input
                type={type}
                name={name}
                value={cliente[name]}
                onChange={handleChange}
                placeholder={label}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          ))}

          {/* Selector de Rol */}
          <div className="form-group">
            <label className="block font-medium text-gray-700">Rol:</label>
            <select
              name="rol"
              value={cliente.rol}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="cliente">Cliente</option>
              <option value="mecanico">Mecánico</option>
              <option value="gerente">Gerente</option>
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
              onClick={() => navigate("/clientes")}
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

export default EditarCliente;
