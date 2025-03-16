import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../styles/Calendar.css";

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
    const fechaFin = new Date(new Date(fechaInicio).getTime() + 60 * 60 * 1000); // Duración de 1 hora

    return {
      title: `${cita.tipo_servicio} - ${
        cita.vehiculo?.cliente?.nombre || "Cliente Desconocido"
      } - ${cita.vehiculo.placa} `,
      start: new Date(fechaInicio),
      end: fechaFin,
      allDay: false,
      id: cita.id_cita,
      estado: cita.estado, // Guardamos el estado de la cita
    };
  });

  // Asigna colores según el estado de la cita
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "bg-gray-500"; // Color por defecto
    let textColor = "text-white";
  
    if (vistaActual === "agenda") {
      backgroundColor = "bg-transparent"; // 🔹 Sin color en vista agenda
      textColor = "text-black";
    } else {
      switch (event.estado) {
        case "Completada":
          backgroundColor = "bg-green-500";
          break;
        case "Pendiente":
          backgroundColor = "bg-yellow-500";
          break;
        case "Asignada":
          backgroundColor = "bg-blue-500";
          break;
        default:
          backgroundColor = "bg-gray-500";
          break;
      }
    }
    return {
      className: `${backgroundColor} ${textColor} font-semibold p-2 rounded-md border border-gray-700`,
    };
  };

  return (
    <div className="max-w-1000px mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        📅 Calendario de Citas
      </h2>
  
      <Calendar
        localizer={localizer}
        events={eventosCalendario}
        startAccessor="start"
        endAccessor="end"
        view={vistaActual}
        onView={(nuevaVista) => setVistaActual(nuevaVista)}
        onDoubleClickEvent={(evento) => {
          alert(`
          🔧 DETALLES DE LA CITA
          📅 Cita nº: ${evento.id}
          🏷️ Servicio: ${evento.title}
          🚗 Placa: ${evento.title.split("-")[2].trim()}
          📌 Estado: ${evento.estado}
          🕒 Fecha: ${moment(evento.start).format("DD/MM/YYYY HH:mm")}`);
        }}
        date={fechaActual}
        onNavigate={(nuevaFecha) => setFechaActual(nuevaFecha)}
        eventPropGetter={eventStyleGetter}
        style={{ height: "900px", marginTop: "20px" }}
      />
    </div>
  );
};

export default CitasCalendario;
