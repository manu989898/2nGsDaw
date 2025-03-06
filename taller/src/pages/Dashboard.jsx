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


const Dashboard = () => {
  return (
    <div className="details-section">
      {/* Encabezado */}
      <h1>Gestor de Taller</h1>
      <p style={{ textAlign: "center", color: "#6c757d", marginBottom: "30px" }}>
        Bienvenido al sistema de gestión de citas, clientes y vehículos. Usa las secciones de abajo para navegar.
      </p>

      {/* Contenedor de tarjetas */}
      <div className="dashboard-cards">
        <div className="card">
          <img
            src={clienteImg}
            alt="Clientes"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Clientes</h3>
          <p>Consulta la lista de clientes, crea nuevos registros y gestiona su información.</p>
          <Link to="/clientes" target="_blank">
            <button className="btn-login">Ir a Clientes</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={citaImg}
            alt="Citas"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Citas</h3>
          <p>Gestiona las citas de los clientes, asigna horarios y verifica el estado de cada una.</p>
          <Link to="/citas" target="_blank">
            <button className="btn-login">Ir a Citas</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={vehiculosImg}
            alt="Vehículos"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Vehículos</h3>
          <p>Administra los vehículos de los clientes, añade nuevos y consulta sus datos.</p>
          <Link to="/vehiculos" target="_blank">
            <button className="btn-login">Ir a Vehículos</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={mecanicosImg}
            alt="Mecánicos"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Mecánicos</h3>
          <p>Gestiona el equipo de mecánicos del taller y asigna tareas a cada uno.</p>
          <Link to="/mecanicos" target="_blank">
            <button className="btn-login">Ir a Mecánicos</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={facturasImg}
            alt="Facturas"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Facturas</h3>
          <p>Consulta y gestiona las facturas emitidas por el taller.</p>
          <Link to="/facturas" target="_blank">
            <button className="btn-login">Ir a Facturas</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={notificacionesImg}
            alt="Notificaciones"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Notificaciones</h3>
          <p>Consulta y administra las notificaciones del sistema.</p>
          <Link to="/notificaciones" target="_blank">
            <button className="btn-login">Ir a Notificaciones</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={inventariosImg}
            alt="Inventarios"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Inventarios</h3>
          <p>Gestiona el inventario de piezas, herramientas y materiales del taller.</p>
          <Link to="/inventarios" target="_blank">
            <button className="btn-login">Ir a Inventarios</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={reparacionesImg}
            alt="Reparaciones"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Reparaciones</h3>
          <p>Consulta las reparaciones en curso y su progreso.</p>
          <Link to="/reparaciones" target="_blank">
            <button className="btn-login">Ir a Reparaciones</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={reportesImg}
            alt="Reportes"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Reportes</h3>
          <p>Genera reportes detallados sobre las operaciones del taller.</p>
          <Link to="/reportes" target="_blank">
            <button className="btn-login">Ir a Reportes</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={historialImg}
            alt="Historial de Servicios"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Historial de Servicios</h3>
          <p>Consulta el historial completo de servicios realizados en el taller.</p>
          <Link to="/historial-servicios" target="_blank">
            <button className="btn-login">Ir a Historial</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={empleadosImg}
            alt="Empleados"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Empleados</h3>
          <p>Administra el personal del taller, revisa horarios y actualiza información.</p>
          <Link to="/empleados" target="_blank">
            <button className="btn-login">Ir a Empleados</button>
          </Link>
        </div>

        <div className="card">
          <img
            src={timelineImg}
            alt="Timeline"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>Timeline</h3>
          <p>Revisa la línea de tiempo de actividades y tareas completadas.</p>
          <Link to="/timeline" target="_blank">
            <button className="btn-login">Ir a Timeline</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
