import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import "../styles/Timeline.css";

const Reparaciones = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [filteredReparaciones, setFilteredReparaciones] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [ordenEstado, setOrdenEstado] = useState(''); // Estado para manejar el orden por estado
  const navigate = useNavigate();
  const [expandedNotes, setExpandedNotes] = useState({}); // Estado para controlar las notas expandidas

  useEffect(() => {
    const fetchReparaciones = async () => {
      try {
        const response = await api.get('/reparaciones');
        setReparaciones(response.data);
        setFilteredReparaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las reparaciones:', error);
      }
    };

    fetchReparaciones();
  }, []);

  useEffect(() => {
    let filtradas = [...reparaciones];

    if (estadoFiltro) {
      filtradas = filtradas.filter(
        (reparacion) => reparacion.estado === estadoFiltro
      );
    }

    if (fechaFiltro) {
      filtradas = filtradas.filter(
        (reparacion) =>
          reparacion.fecha_fin &&
          new Date(reparacion.fecha_fin).toISOString().slice(0, 10) ===
            fechaFiltro
      );
    }

    // Ordenar las reparaciones por estado si se ha seleccionado un criterio
    if (ordenEstado) {
      filtradas = filtradas.sort((a, b) => {
        if (ordenEstado === 'asc') {
          return a.estado.localeCompare(b.estado); // Orden ascendente
        } else {
          return b.estado.localeCompare(a.estado); // Orden descendente
        }
      });
    }

    setFilteredReparaciones(filtradas);
  }, [estadoFiltro, fechaFiltro, reparaciones, ordenEstado]);

  const toggleNotes = (id) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id], // Alterna entre expandido y truncado
    }));
  };

 

  return (
    <div className="reparaciones-container">
     <h1 className="text-2xl mt-4 font-bold text-gray-700 mb-4 text-center">
    🔧 Reparaciones
  </h1>

      <div className="filters-container">
        {/* Filtros */}
        <div className="form-group">
          <label htmlFor="estadoFiltro">Estado</label>
          <select
            id="estadoFiltro"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            className="input-busqueda"
          >
            <option value="">Todos</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fechaFiltro">Fecha de Finalización</label>
          <input
            type="date"
            id="fechaFiltro"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="input-busqueda"
          />
        </div>

        <div className="leyenda">
        <label htmlFor="estadoFiltro">Leyenda de progreso</label>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
    <div style={{ width: '20px', height: '20px', backgroundColor: 'grey', marginRight: '10px' }}></div>
    <span>0% - El mecánico está trabajando en el vehículo</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
    <div style={{ width: '20px', height: '20px', backgroundColor: 'orange', marginRight: '10px' }}></div>
    <span>50% - El mecánico ha terminado</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
    <div style={{ width: '20px', height: '20px', backgroundColor: 'green', marginRight: '10px' }}></div>
    <span>100% - Reparación completada y facturada</span>
  </div>
</div>

     
     
      </div>

      <div className="max-w-[90%] mx-auto my-6 p-4">
  

  <div className="overflow-x-auto">
  <div className="table-container">
  <table
    style={{
      tableLayout: "fixed", // Fija el ancho de las celdas
      width: "100%", // Asegura que la tabla ocupe todo el espacio disponible
    }}
  >
    <thead>
      <tr>
        
        <th>Número Reparación</th>
        <th>Número Cita</th>
        <th>Progreso</th>
        <th>Estado</th>
        <th>Notas</th>
        <th>Fecha de Inicio</th>
        <th>Fecha de Finalización</th>

      </tr>
    </thead>
    <tbody>
      {filteredReparaciones.map((reparacion) => (
        <tr key={reparacion.id_reparacion}>
          <td>{reparacion.id_reparacion}</td>
          <td>{reparacion.id_cita}</td>
          <td>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${reparacion.progreso}%`,
                  backgroundColor:
                    reparacion.progreso === 100
                      ? "#4CAF50" // Verde para completado
                      : reparacion.progreso >= 50
                      ? "#FFA500" // Naranja para en progreso
                      : "#FF4500", // Rojo para poco avance
                }}
              >
                <span className="progress-text">{reparacion.progreso}%</span>
              </div>
            </div>
          </td>
           {/* 📌 Estado */}
            <td className="p-4 text-center">
              <span
                className={`px-3 py-1 rounded-full text-white ${
                  reparacion.estado === "Completada"
                    ? "bg-green-500"
                    : reparacion.estado === "En Proceso"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {reparacion.estado}
              </span>
            </td>
            <td
  className="p-4 text-center align-middle"
  style={{
    maxWidth: "400px",
    whiteSpace: "normal", // Permite el salto de línea
    textAlign: "justify", // Justifica el texto para mejor legibilidad
  }}
>
  {expandedNotes[reparacion.id_reparacion] ? (
    <div>
      <p>{reparacion.notas}</p>
      <button
        className="text-blue-500 hover:underline mt-1 focus:outline-none"
        onClick={() =>
          setExpandedNotes({
            ...expandedNotes,
            [reparacion.id_reparacion]: false,
          })
        }
      >
        Leer menos
      </button>
    </div>
  ) : (
    <div>
      <p>
        {reparacion.notas?.length > 100
          ? `${reparacion.notas.slice(0, 30)}...`
          : reparacion.notas}
      </p>
      {reparacion.notas?.length > 100 && (
        <button
          className="text-blue-500 hover:underline mt-1 focus:outline-none"
          onClick={() =>
            setExpandedNotes({
              ...expandedNotes,
              [reparacion.id_reparacion]: true,
            })
          }
        >
          Leer más
        </button>
      )}
    </div>
  )}
</td>

          <td>{reparacion.fecha_inicio}</td>
          <td>{reparacion.fecha_fin || "Pendiente"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  </div>
</div>

    </div>
  );
};

export default Reparaciones;
