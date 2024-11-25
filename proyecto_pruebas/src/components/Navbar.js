import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Gestor de Citas</h1>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/citas">Citas</Link></li>
        <li><Link to="/vehiculos">Vehículos</Link></li>
        <li><Link to="/mecanicos">Mecánicos</Link></li>
        <li><Link to="/facturas">Facturas</Link></li> {/* Nuevo enlace */}
        <li><Link to="/notificaciones">Notificaciones</Link></li> {/* Nuevo enlace */}
        <li><Link to="/inventarios">Inventarios</Link></li> {/* Nuevo enlace */}
        <li><Link to="/reparaciones">Reparaciones</Link></li> {/* Nuevo enlace */}
        <li><Link to="/reportes">Reportes</Link></li> {/* Nuevo enlace */}
        <li><Link to="/historial-servicios">Historial Servicios</Link></li> {/* Nuevo enlace */}
      </ul>
    </nav>
  );
};

export default Navbar;
