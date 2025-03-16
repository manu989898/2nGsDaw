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
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");  // Obtener el token desde sessionStorage
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
          setUser(data.user);  // Aquí se asigna el usuario
        })
        .catch((error) => {
          console.error("Error al obtener usuario:", error);
          sessionStorage.removeItem("authToken");  // Si hubo error, elimina el token
        });
    } else {
      setUser(null); // Si no hay token, el usuario no está autenticado
    }
  }, []);
  
  const handleLogout = () => {
    // Elimina el token de sessionStorage en lugar de localStorage
    sessionStorage.removeItem("authToken");
    setUser(null);
  };
  
  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute user={user}>
              <InfoClientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-cliente/:id"
          element={
            <ProtectedRoute user={user}>
              <EditarCliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/empleados"
          element={
            <ProtectedRoute user={user}>
              <Empleados />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citas"
          element={
            <ProtectedRoute user={user}>
              <Citas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear-cita"
          element={
            <ProtectedRoute user={user}>
              <CrearCita />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehiculos"
          element={
            <ProtectedRoute user={user}>
              <Vehiculos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-vehiculo/:id"
          element={
            <ProtectedRoute user={user}>
              <EditarVehiculo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mecanicos"
          element={
            <ProtectedRoute user={user}>
              <Mecanicos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notificaciones"
          element={
            <ProtectedRoute user={user}>
              <Notificaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reparaciones"
          element={
            <ProtectedRoute user={user}>
              <Reparaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear-reparacion"
          element={
            <ProtectedRoute user={user}>
              <CrearReparacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportes"
          element={
            <ProtectedRoute user={user}>
              <Reportes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timeline"
          element={
            <ProtectedRoute user={user}>
              <Timeline />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestor-reparaciones"
          element={
            <ProtectedRoute user={user}>
              <GestorReparaciones />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
