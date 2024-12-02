import React from 'react';
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
import HistorialServicios from './pages/HistorialServicios'; 
import Empleados from './pages/Empleados'; 
import Timeline from './pages/Timeline';
import InfoClientes from './pages/InfoCliente';
import CrearCita from './pages/CrearCita';
import EditarVehiculo from './pages/EditarVehiculo';
import CrearCliente from './pages/CrearCliente';
import EditarCliente from './pages/EditarCliente';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Barra de navegación */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} /> {/* Nueva ruta */}
        <Route path="/clientes" element={<InfoClientes />} />
        <Route path="/editar-cliente/:id" element={<EditarCliente />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/crear-cita" element={<CrearCita />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/editar-vehiculo/:id" element={<EditarVehiculo />} />
        <Route path="/mecanicos" element={<Mecanicos />} />
        <Route path="/pruebas" element={<CrearCita />} /> 
        <Route path="/notificaciones" element={<Notificaciones />} /> 
        <Route path="/inventarios" element={<Inventarios />} /> 
        <Route path="/reparaciones" element={<Reparaciones />} /> 
        <Route path="/reportes" element={<Reportes />} /> 
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/historial-servicios" element={<HistorialServicios />} /> 
      </Routes>
    </Router>
  );
};

export default App;
