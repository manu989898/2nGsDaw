import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

// Usamos momentLocalizer para compatibilidad con moment.js
const localizer = momentLocalizer(moment);

const CitasCalendario = () => {
  const [citas, setCitas] = useState([]);
  const [vistaActual, setVistaActual] = useState("month");
  const [fechaActual, setFechaActual] = useState(new Date()); // ← Estado para la fecha actual

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
    const fechaInicio = cita.fecha_hora.replace(" ", "T");
    const fechaFin = new Date(new Date(fechaInicio).getTime() + 60 * 60 * 1000); 

    return {
      title: `${cita.tipo_servicio} - ${cita.vehiculo?.cliente?.nombre || "Cliente Desconocido"} - ${cita.vehiculo.placa} `,
      start: new Date(fechaInicio),
      end: fechaFin,
      allDay: false,
      id: cita.id_cita,
      estado: cita.estado,
    };
  });

  return (
    <Calendar
      localizer={localizer}
      events={eventosCalendario}
      startAccessor="start"
      endAccessor="end"
      view={vistaActual}
      onView={(nuevaVista) => setVistaActual(nuevaVista)}
      onDoubleClickEvent={(evento) => console.log(evento)}
      date={fechaActual}  // ← Agregamos la fecha actual
      onNavigate={(nuevaFecha) => setFechaActual(nuevaFecha)}  // ← Maneja los botones "Next", "Back" y "Today"
      style={{ height: 1200, margin: "50px 0", padding: "0 50px" }}
    />
  );
};

export default CitasCalendario;
