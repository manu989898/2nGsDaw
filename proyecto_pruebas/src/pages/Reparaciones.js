import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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

  const columns = [
    'id_reparacion',
    'id_cita',
    'progreso',
    'estado',
    'notas',
    'fecha_inicio',
    'fecha_fin',
  ];

  return (
    <div className="reparaciones-container">
      <h1>Reparaciones</h1>

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

       

     
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col.replace('_', ' ').toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredReparaciones.map((reparacion) => (
              <tr key={reparacion.id_reparacion}>
                <td>{reparacion.id_reparacion}</td>
                <td>{reparacion.id_cita}</td>
                <td>
                  <div
                    style={{
                      width: '100%',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '5px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${reparacion.progreso}%`,
                        backgroundColor:
                          reparacion.progreso === 100 ? 'green' : 'orange',
                        height: '10px',
                      }}
                    ></div>
                  </div>
                  {reparacion.progreso}%
                </td>
                <td
                  style={{
                    backgroundColor:
                      reparacion.estado === 'Completada' ? 'green' : 'yellow',
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {reparacion.estado}
                </td>
                <td
                style={{
                  maxWidth: '180px',
                  overflowWrap: 'break-word',
                }}
                >
                  {expandedNotes[reparacion.id_reparacion] ? (
                    <div>
                      <p
                      style={{
                        maxWidth: '200px',
                        overflowWrap: 'break-word',
                      }}
                      >{reparacion.notas}</p>
                      <button
                        className="btn-leer-mas"
                        onClick={() => toggleNotes(reparacion.id_reparacion)}
                      >
                        Leer menos
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>
                        {reparacion.notas?.length > 100
                          ? `${reparacion.notas.slice(0, 100)}...`
                          : reparacion.notas}
                      </p>
                      {reparacion.notas?.length > 100 && (
                        <button
                          className="btn-leer-mas"
                          onClick={() => toggleNotes(reparacion.id_reparacion)}
                        >
                          Leer más
                        </button>
                      )}
                    </div>
                  )}
                </td>
                <td>{reparacion.fecha_inicio}</td>
                <td>{reparacion.fecha_fin || 'Pendiente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reparaciones;
