import React from "react";
import { Link } from "react-router-dom";

// Importar imágenes
import clienteImg from "../img/cliente.png";
import citaImg from "../img/cita.png";
import vehiculosImg from "../img/embotellamiento.png";
import mecanicosImg from "../img/mecanico.png";
import facturasImg from "../img/factura.png";
import notificacionesImg from "../img/activo.png";
import inventariosImg from "../img/inventario.png";
import reparacionesImg from "../img/torre-de-pc.png";
import reportesImg from "../img/reporte-de-negocios.png";
import historialImg from "../img/matricula.jpg";
import empleadosImg from "../img/Ford.png";
import timelineImg from "../img/linea-de-tiempo.png";

const sections = [
  { title: "Clientes", image: clienteImg, path: "/clientes", description: "Consulta la lista de clientes y gestiona su información." },
  { title: "Citas", image: citaImg, path: "/citas", description: "Gestiona las citas de los clientes y asigna horarios." },
  { title: "Vehículos", image: vehiculosImg, path: "/vehiculos", description: "Administra los vehículos de los clientes." },
  { title: "Mecánicos", image: mecanicosImg, path: "/mecanicos", description: "Gestiona el equipo de mecánicos del taller." },
  { title: "Facturas", image: facturasImg, path: "/facturas", description: "Consulta y gestiona las facturas emitidas." },
  { title: "Notificaciones", image: notificacionesImg, path: "/notificaciones", description: "Consulta y administra notificaciones del sistema." },
  { title: "Inventarios", image: inventariosImg, path: "/inventarios", description: "Gestiona el inventario del taller." },
  { title: "Reparaciones", image: reparacionesImg, path: "/reparaciones", description: "Consulta reparaciones en curso." },
  { title: "Reportes", image: reportesImg, path: "/reportes", description: "Genera reportes detallados sobre el taller." },
  { title: "Historial de Servicios", image: historialImg, path: "/historial-servicios", description: "Consulta el historial de servicios realizados." },
  { title: "Empleados", image: empleadosImg, path: "/empleados", description: "Administra el personal del taller." },
  { title: "Timeline", image: timelineImg, path: "/timeline", description: "Revisa la línea de tiempo de actividades." },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestor de Taller</h1>
        <p className="text-gray-600 mt-2">
          Bienvenido al sistema de gestión de citas, clientes y vehículos.
        </p>
      </div>

      {/* Contenedor de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {sections.map((section, index) => (
    <div key={index} className="bg-white shadow-lg rounded-xl p-4 text-center transition transform hover:scale-105">
      <div className="w-full h-40 flex justify-center items-center overflow-hidden rounded-lg">
        <img 
          src={section.image} 
          alt={section.title} 
          className="w-auto h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold mt-4">{section.title}</h3>
      <p className="text-gray-600 mt-2">{section.description}</p>
      <Link to={section.path} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Ir a {section.title}
      </Link>
    </div>
  ))}
</div>

    </div>
  );
};

export default Dashboard;
