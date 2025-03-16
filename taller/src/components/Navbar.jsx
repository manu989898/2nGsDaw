import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Nombre de la App */}
        <Link to="/" className="text-xl font-bold">
          AutoGestor
        </Link>

        {/* Enlaces */}
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300">Dashboard</Link></li>
          <li><Link to="/clientes" className="hover:text-gray-300">Clientes</Link></li>
          <li><Link to="/vehiculos" className="hover:text-gray-300">Vehículos</Link></li>
          <li><Link to="/citas" className="hover:text-gray-300">Citas</Link></li>
          <li><Link to="/reparaciones" className="hover:text-gray-300">Reparaciones</Link></li>
          <li><Link to="/gestor-reparaciones" className="hover:text-gray-300">Gestor R</Link></li>
          <li><Link to="/timeline" className="hover:text-gray-300">Timeline</Link></li>
          <li><Link to="/notificaciones" className="hover:text-gray-300">Notificaciones</Link></li>
          <li><Link to="/reportes" className="hover:text-gray-300">Reportes</Link></li>
        </ul>

        {/* Usuario autenticado */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden sm:inline">Bienvenid@, <strong>{user.name}</strong></span>
              <button
                onClick={onLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">SignUp</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
