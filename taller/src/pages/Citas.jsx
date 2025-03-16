import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CrearReparacion from "./CrearReparacion"; 
import CitasCalendario from "./CitasCalendario"; 

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [mostrarCrearReparacion, setMostrarCrearReparacion] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const navigate = useNavigate();

  // Obtener citas al cargar el componente
  useEffect(() => {
    async function fetchCitas() {
      try {
        const response = await axios.get("http://localhost:8000/api/citas");
        setCitas(response.data);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    }
    fetchCitas();
  }, []);

  // Filtrar citas según el estado seleccionado
  useEffect(() => {
    let filtradas = [...citas];
    if (estadoFiltro) {
      filtradas = filtradas.filter((cita) => cita.estado === estadoFiltro);
    }
    setFilteredCitas(filtradas);
  }, [estadoFiltro, citas]);

  // Ordenar por estado
  const ordenarPorEstado = () => {
    const nuevasCitasOrdenadas = [...filteredCitas].sort((a, b) => {
      return ordenAscendente
        ? a.estado.localeCompare(b.estado)
        : b.estado.localeCompare(a.estado);
    });

    setFilteredCitas(nuevasCitasOrdenadas);
    setOrdenAscendente(!ordenAscendente);
  };

  // Eliminar cita
  const eliminarCita = async (idCita) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8000/api/citas/${idCita}`);
      alert("Cita eliminada correctamente.");

      // Actualizar las citas eliminando la que se acaba de borrar
      setCitas((prev) => prev.filter((cita) => cita.id_cita !== idCita));
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
      alert("No se pudo eliminar la cita.");
    }
  };

  // Completar cita
  const completarCita = async (idCita) => {
    try {
      await axios.put(`http://localhost:8000/api/citas/${idCita}`, {
        estado: "Completada",
      });

      alert("Cita completada correctamente.");

      // Actualizar las citas con el nuevo estado
      setCitas((prev) =>
        prev.map((cita) =>
          cita.id_cita === idCita ? { ...cita, estado: "Completada" } : cita
        )
      );
    } catch (error) {
      console.error("Error al completar la cita:", error);
      alert("No se pudo completar la cita.");
    }
  };

  return (
    <div className="max-w-[90%] mx-auto my-6 p-4">
      <h2 className="text-center text-xl font-bold mb-4">Citas</h2>

      {/* 📌 Filtros y Botones */}
     
        {/* 📌 Filtro por Estado */}

        {/* 📌 Botones */}
        <div className="flex space-x-2 mt-4 md:mt-0">
        <div className="flex items-center space-x-2">
          <label htmlFor="estadoFiltro" className="text-gray-700 font-medium">
            Estado:
          </label>
          <select
            id="estadoFiltro"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Asignada">Asignada</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            onClick={() => navigate("/crear-cita")}
          >
            Crear Nueva Cita
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
            onClick={() => setMostrarCrearReparacion(!mostrarCrearReparacion)}
          >
            {mostrarCrearReparacion ? "Ocultar Reparación" : "Crear Reparación"}
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600"
            onClick={() => setMostrarCalendario(!mostrarCalendario)}
          >
            {mostrarCalendario ? "Ver en Tabla" : "Ver en Calendario"}
          </button>
        </div>


      {/* 📌 Mostrar CrearReparacion si está activo */}
      {mostrarCrearReparacion && <CrearReparacion />}

      {/* 📌 Mostrar Citas en Calendario o en Tabla */}
      {mostrarCalendario ? (
        <CitasCalendario citas={filteredCitas} />
      ) : (
        <div className="overflow-x-auto">
           <table className="w-full border-collapse border-none shadow-lg bg-white rounded-lg table-fixed">
    {/* 🔹 Encabezado */}
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="p-4 border w-[5%]">ID Cita</th>
        <th className="p-4 border w-[15%]">Cliente</th>
        <th className="p-4 border w-[10%]">Vehículo</th>
        <th className="p-4 border w-[10%]">Placa</th>
        <th className="p-4 border w-[20%]">Detalles</th>
        <th 
          className="p-4 border w-[10%] cursor-pointer hover:bg-blue-700 transition duration-200"
          onClick={ordenarPorEstado}
        >
          Estado {ordenAscendente ? "⬆️" : "⬇️"}
        </th>
        <th className="p-4 border w-[15%]">Fecha</th>
        <th className="p-4 border w-[15%]">Acciones</th>
      </tr>
    </thead>

    {/* 🔹 Cuerpo de la Tabla */}
    <tbody>
      {filteredCitas.map((cita, index) => (
        <tr 
          key={cita.id_cita} 
          className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition duration-150`}
        >
          <td className="p-4 text-center border h-16">{cita.id_cita}</td>

          {/* 📌 Cliente */}
          <td className="p-4 text-center border h-16">
            {cita.vehiculo?.cliente?.nombre || "Nombre no disponible"}{" "}
            {cita.vehiculo?.cliente?.apellido || "Apellido no disponible"}
          </td>

          {/* 📌 Imagen del vehículo */}
          <td className="p-4 border h-16">
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:8000/img/${cita.vehiculo.marca}.png`}
                alt={cita.vehiculo.modelo}
                className="w-12 h-12 rounded-lg shadow-md object-contain"
              />
            </div>
          </td>

          {/* 📌 Placa del vehículo */}
          <td className="p-4 text-center border h-16">{cita.vehiculo.placa || "Sin Detalles"}</td>

          {/* 📌 Detalles de la cita */}
          <td className="p-4 text-center border h-16">{cita.tipo_servicio || "Sin Detalles"}</td>

          {/* 📌 Estado de la cita */}
          <td className="p-4 text-center border h-16">
            <span className={`px-3 py-1 rounded-full text-white ${
              cita.estado === "Pendiente" ? "bg-yellow-500" :
              cita.estado === "Asignada" ? "bg-blue-500" :
              "bg-green-500"
            }`}>
              {cita.estado || "Sin Estado"}
            </span>
          </td>

          {/* 📌 Fecha */}
          <td className="p-4 text-center border h-16">{cita.fecha_hora || "Sin Fecha"}</td>

          {/* 📌 Botones de acción */}
          <td className="p-4 border h-16">
            <div className="flex justify-center items-center space-x-2 flex-wrap gap-2">
            <button 
                onClick={() => eliminarCita(cita.id_cita)}
                disabled={cita.estado === "Asignada" || cita.estado === "Completada"}
                className={`px-3 py-2 rounded-lg text-white shadow-md transition ${
                  cita.estado === "Asignada" || cita.estado === "Completada"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                ❌ Eliminar
              </button>

              <button 
                onClick={() => completarCita(cita.id_cita)}
                disabled={cita.estado === "Completada"}
                className={`px-3 py-2 rounded-lg text-white shadow-md transition ${
                  cita.estado === "Completada"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                ✅ Completar
              </button>
            </div>
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

export default Citas;
