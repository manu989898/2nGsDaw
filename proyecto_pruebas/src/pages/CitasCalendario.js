import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CrearReparacion from "./CrearReparacion";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { parse, format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Usamos momentLocalizer para compatibilidad con moment.js
const localizer = momentLocalizer(require("moment"));

const CitasCalendario = () => {
  const [citas, setCitas] = useState([]);
  const [filteredCitas, setFilteredCitas] = useState([]);
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

  // Transformar las citas para usarlas en el calendario
  const eventosCalendario = citas.map((cita) => {
    const fechaInicio = cita.fecha_hora.replace(" ", "T"); // Convertir de "YYYY-MM-DD HH:mm:ss" a "YYYY-MM-DDTHH:mm:ss"
    
    // Si necesitas un evento de una sola hora, puedes calcular el 'end'
    const fechaFin = new Date(new Date(fechaInicio).getTime() + 60 * 60 * 1000); // Añadir 1 hora para el "end"

    return {
      title: `${cita.tipo_servicio} - ${cita.vehiculo?.cliente?.nombre || "Cliente Desconocido"} - ${cita.vehiculo.placa} `,
      start: new Date(fechaInicio),  // Convertimos fechaInicio a un objeto Date
      end: fechaFin,  // Establecemos fechaFin como 1 hora después
      allDay: false,  // Aseguramos que no sea todo el día
      id: cita.id_cita,
      estado: cita.estado,
    };
  });

  return (
    <div>
      {/* Calendario */}
      <Calendar
        localizer={localizer}
        events={eventosCalendario} // Pasamos los eventos transformados
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px 0", padding: "0 50px" }}
        onSelectEvent={(event) => alert(`Cita seleccionada: ${event.title}`)}
      />
    </div>
  );
};

export default CitasCalendario;
