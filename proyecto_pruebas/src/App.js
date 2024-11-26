import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Importa el componente Navbar
import Clientes from './pages/Clientes';
import Citas from './pages/Citas';
import Vehiculos from './pages/Vehiculos';
import Mecanicos from './pages/Mecanicos';
import Dashboard from './pages/Dashboard';
import Facturas from './pages/Facturas'; // Nueva página
import Notificaciones from './pages/Notificaciones'; // Nueva página
import Inventarios from './pages/Inventarios'; // Nueva página
import Reparaciones from './pages/Reparaciones'; // Nueva página
import Reportes from './pages/Reportes'; // Nueva página
import HistorialServicios from './pages/HistorialServicios'; // Nueva página
import Empleados from './pages/Empleados'; // Importa el componente Empleados


const App = () => {
  return (
    <Router>
      <Navbar /> {/* Barra de navegación */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/mecanicos" element={<Mecanicos />} />
        <Route path="/facturas" element={<Facturas />} /> {/* Nueva ruta */}
        <Route path="/notificaciones" element={<Notificaciones />} /> {/* Nueva ruta */}
        <Route path="/inventarios" element={<Inventarios />} /> {/* Nueva ruta */}
        <Route path="/reparaciones" element={<Reparaciones />} /> {/* Nueva ruta */}
        <Route path="/reportes" element={<Reportes />} /> {/* Nueva ruta */}
        <Route path="/historial-servicios" element={<HistorialServicios />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
