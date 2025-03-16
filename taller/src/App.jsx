import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Citas from "./pages/Citas";
import Vehiculos from "./pages/Vehiculos";
import Mecanicos from "./pages/Mecanicos";
import Dashboard from "./pages/Dashboard";
import Facturas from "./pages/Facturas";
import Notificaciones from "./pages/Notificaciones";
import Inventarios from "./pages/Inventarios";
import Reparaciones from "./pages/Reparaciones";
import Reportes from "./pages/Reportes";
import Empleados from "./pages/Empleados";
import Timeline from "./pages/Timeline";
import InfoClientes from "./pages/InfoCliente";
import CrearCita from "./pages/CrearCita";
import EditarVehiculo from "./pages/EditarVehiculo";
import CrearCliente from "./pages/CrearCliente";
import EditarCliente from "./pages/EditarCliente";
import CrearReparacion from "./pages/CrearReparacion";
import Register from "./pages/Register";
import GestorReparaciones from "./pages/GestorReparaciones";
import React, { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(() => {
    // Load the user synchronously from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true); // Prevent redirection until confirmed

  useEffect(() => {
    // If there's a token, validate it with an API call
    const token = sessionStorage.getItem("authToken");

    if (token) {
      fetch("http://127.0.0.1:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
          sessionStorage.setItem("user", JSON.stringify(data.user)); // Store user data persistently
        })
        .catch(() => {
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("user");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  // Prevent redirects while checking authentication status
  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        {/* Protected routes */}
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/clientes" element={user ? <InfoClientes /> : <Navigate to="/login" />} />
        <Route path="/editar-cliente/:id" element={user ? <EditarCliente /> : <Navigate to="/login" />} />
        <Route path="/empleados" element={user ? <Empleados /> : <Navigate to="/login" />} />
        <Route path="/citas" element={user ? <Citas /> : <Navigate to="/login" />} />
        <Route path="/crear-cita" element={user ? <CrearCita /> : <Navigate to="/login" />} />
        <Route path="/vehiculos" element={user ? <Vehiculos /> : <Navigate to="/login" />} />
        <Route path="/editar-vehiculo/:id" element={user ? <EditarVehiculo /> : <Navigate to="/login" />} />
        <Route path="/mecanicos" element={user ? <Mecanicos /> : <Navigate to="/login" />} />
        <Route path="/notificaciones" element={user ? <Notificaciones /> : <Navigate to="/login" />} />
        <Route path="/reparaciones" element={user ? <Reparaciones /> : <Navigate to="/login" />} />
        <Route path="/crear-reparacion" element={user ? <CrearReparacion /> : <Navigate to="/login" />} />
        <Route path="/reportes" element={user ? <Reportes /> : <Navigate to="/login" />} />
        <Route path="/timeline" element={user ? <Timeline /> : <Navigate to="/login" />} />
        <Route path="/gestor-reparaciones" element={user ? <GestorReparaciones /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
