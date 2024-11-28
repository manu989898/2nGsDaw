import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/citas">Citas</Link></li>
        <li><Link to="/vehiculos">Vehículos</Link></li>
        <li><Link to="/mecanicos">Mecánicos</Link></li>
        <li><Link to="/empleados">Empleados</Link></li>
        <li><Link to="/pruebas">pruebas</Link></li>
        <li><Link to="/notificaciones">Notificaciones</Link></li>
        <li><Link to="/inventarios">Inventarios</Link></li>
        <li><Link to="/reparaciones">Reparaciones</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
        <li><Link to="/timeline">Timeline</Link></li>
        <li><Link to="/historial-servicios">Historial Servicios</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
