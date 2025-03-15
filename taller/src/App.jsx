import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Importa el componente Navbar
import Login from './pages/Login'; // Importa el componente Login
import Citas from './pages/Citas';
import Vehiculos from './pages/Vehiculos';
import Mecanicos from './pages/Mecanicos';
import Dashboard from './pages/Dashboard';
import Facturas from './pages/Facturas'; 
import Notificaciones from './pages/Notificaciones'; 
import Inventarios from './pages/Inventarios'; 
import Reparaciones from './pages/Reparaciones'; 
import Reportes from './pages/Reportes'; 
import Empleados from './pages/Empleados'; 
import Timeline from './pages/Timeline';
import InfoClientes from './pages/InfoCliente';
import CrearCita from './pages/CrearCita';
import EditarVehiculo from './pages/EditarVehiculo';
import CrearCliente from './pages/CrearCliente';
import EditarCliente from './pages/EditarCliente';
import CrearReparacion from './pages/CrearReparacion';
import React, { useState, useEffect } from "react";
import Register from './pages/Register';
import GestorReparaciones from './pages/GestorReparaciones';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch("http://127.0.0.1:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al autenticar");
        })
        .then((data) => {
          console.log("Usuario recuperado en App:", data.user); // Verificar usuario
          setUser(data.user); // Configurar estado del usuario
        })
        .catch((error) => {
          console.error("Error al obtener usuario:", error);
          localStorage.removeItem("authToken"); // Limpia el token si es inválido
        });
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };


  return (
    
    <Router>
      <Navbar user={user} onLogout={handleLogout} /> {/* Pasar el usuario y la función de logout al Navbar */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={setUser} />} /> {/* Pasar función para manejar login */}
        <Route path="/clientes" element={<InfoClientes />} />
        <Route path="/editar-cliente/:id" element={<EditarCliente />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/crear-cita" element={<CrearCita />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/editar-vehiculo/:id" element={<EditarVehiculo />} />
        <Route path="/mecanicos" element={<Mecanicos />} />
        <Route path="/pruebas" element={<CrearReparacion />} /> 
        <Route path="/notificaciones" element={<Notificaciones />} /> 
        <Route path="/reparaciones" element={<Reparaciones />} /> 
        <Route path="/crear-reparacion" element={<CrearReparacion />} />
        <Route path="/reportes" element={<Reportes />} /> 
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gestor-reparaciones" element={<GestorReparaciones />} />
  
      </Routes>
    </Router>
  );
};

export default App;
