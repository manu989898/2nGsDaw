import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CrearReparacion = () => {
  const [citas, setCitas] = useState([]); // Lista de citas disponibles
  const [idCita, setIdCita] = useState(""); // Cita seleccionada
  const [notas, setNotas] = useState(""); // Notas de la reparación
  const [estado, setEstado] = useState("En Proceso"); // Estado de la reparación
  const [fechaInicio, setFechaInicio] = useState(""); // Fecha de inicio
  const [fechaFin, setFechaFin] = useState(""); // Fecha de finalización opcional
  const [vehiculos, setVehiculos] = useState([]); // Lista de vehículos
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citasResponse = await api.get("/citas");
        setCitas(citasResponse.data);
        const vehiculosResponse = await api.get("/vehiculos");
        setVehiculos(vehiculosResponse.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idCita || !estado || !fechaInicio) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    try {
      const response = await api.post("/reparaciones", {
        id_cita: idCita,
        id_mecanico: 9, // Siempre se enviará el mecánico con ID 9
        notas,
        estado,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin || null,
      });
      alert("Reparación creada correctamente.");
      console.log("Reparación creada:", response.data);
      await api.put(`/citas/${idCita}`, { estado: "Asignada" });
      setIdCita("");
      setNotas("");
      setEstado("En Proceso");
      setFechaInicio("");
      setFechaFin("");
      navigate("/reparaciones");
    } catch (error) {
      console.error("Error al crear la reparación:", error);
      alert("No se pudo crear la reparación. Inténtalo de nuevo.");
    }
  };

  return (
   <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
    Crear Reparación
  </h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    {/* 📌 Seleccionar Cita */}
    <div>
      <label htmlFor="idCita" className="block text-gray-700 font-medium mb-1">
        Seleccionar Cita:
      </label>
      <select
        id="idCita"
        value={idCita}
        onChange={(e) => setIdCita(e.target.value)}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        required
      >
        <option value="">-- Seleccionar Cita --</option>
        {citas
          .filter((cita) => cita.estado === "Pendiente")
          .map((cita) => (
            <option key={cita.id_cita} value={cita.id_cita}>
              {`Cita ${cita.id_cita} - Vehículo: ${
                vehiculos.find((vehiculo) => vehiculo.id_vehiculo === cita.id_vehiculo)
                  ?.placa.toUpperCase() || "Sin Placa"
              }`}
            </option>
          ))}
      </select>
    </div>

    {/* 📌 Notas */}
    <div>
      <label htmlFor="notas" className="block text-gray-700 font-medium mb-1">
        Notas:
      </label>
      <textarea
        id="notas"
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        rows="4"
      />
    </div>

    {/* 📌 Estado */}
    <div>
      <label htmlFor="estado" className="block text-gray-700 font-medium mb-1">
        Estado:
      </label>
      <select
        id="estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      >
        <option value="En Proceso">En Proceso</option>
        <option value="Completada">Completada</option>
        <option value="Sin asignar">Sin Asignar</option>
      </select>
    </div>

    {/* 📌 Fecha de Inicio */}
    <div>
      <label htmlFor="fechaInicio" className="block text-gray-700 font-medium mb-1">
        Fecha de Inicio:
      </label>
      <input
        type="datetime-local"
        id="fechaInicio"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        required
      />
    </div>

    {/* 📌 Fecha de Finalización */}
    <div>
      <label htmlFor="fechaFin" className="block text-gray-700 font-medium mb-1">
        Fecha de Finalización (Opcional):
      </label>
      <input
        type="datetime-local"
        id="fechaFin"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
      />
    </div>

    {/* 📌 Botón de Crear Reparación */}
    <div className="flex justify-center">
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition font-semibold"
        type="submit"
      >
        Crear Reparación
      </button>
    </div>
  </form>
</div>

  );
};

export default CrearReparacion;
