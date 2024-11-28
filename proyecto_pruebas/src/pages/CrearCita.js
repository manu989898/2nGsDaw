import React, { useState, useEffect, useRef } from "react";
import api from "../api";

const CrearCita = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarFormularioNuevoCliente, setMostrarFormularioNuevoCliente] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", apellido: "", email: "" });
  const [mostrarFormularioNuevoVehiculo, setMostrarFormularioNuevoVehiculo] = useState(false);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({ marca: "", modelo: "", placa: "", año: "" });
  const [historialGlobal, setHistorialGlobal] = useState([]);
  const [idVehiculo, setIdVehiculo] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const vehiculosRef = useRef(null);
  const [estadoCita, setEstadoCita] = useState("Pendiente");

  useEffect(() => {
    // Configurar la fecha y hora predeterminada al cargar la página
    const now = new Date();
    const isoString = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16); // Formato: YYYY-MM-DDTHH:mm
    setFechaHora(isoString);

    const fetchClientes = async () => {
      try {
        const response = await api.get("/usuarios");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    if (busquedaCliente.trim() === "") {
      setClientesFiltrados([]);
    } else {
      const filtrados = clientes.filter((cliente) =>
        `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(busquedaCliente.toLowerCase())
      );
      setClientesFiltrados(filtrados);
    }
  }, [busquedaCliente, clientes]);

  const verInformacionCliente = async (cliente) => {
    try {
      setClienteSeleccionado(cliente);
      setVehiculos([]);
      setMostrarFormularioNuevoVehiculo(false);

      const vehiculosResponse = await api.get(`/usuarios/${cliente.id_usuario}/vehiculos`);
      const vehiculosData = vehiculosResponse.data.vehiculos;

      const vehiculosConHistorial = vehiculosData.map((vehiculo) => {
        const historial = historialGlobal.filter(
          (h) => h.id_vehiculo === vehiculo.id_vehiculo
        );
        return { ...vehiculo, historial };
      });

      setVehiculos(vehiculosConHistorial);

      if (vehiculosRef.current) {
        vehiculosRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error al cargar los vehículos del cliente:", error);
    }
  };

  const handleNuevoCliente = async (e) => {
    e.preventDefault();
  
    if (!nuevoCliente.nombre || !nuevoCliente.apellido || !nuevoCliente.email || !nuevoCliente.contraseña || !nuevoCliente.rol) {
      alert("Por favor, completa todos los campos del cliente.");
      return;
    }
  
    try {
      // Llamar a la API para crear un nuevo cliente
      const response = await api.post("/usuarios", nuevoCliente);
  
      alert("Cliente creado correctamente.");
      console.log("Cliente creado:", response.data);
  
      // Agregar el nuevo cliente a la lista de clientes y seleccionarlo
      setClientes([...clientes, response.data.data]);
      setClienteSeleccionado(response.data.data);
  
      // Limpiar el formulario
      setNuevoCliente({ nombre: "", apellido: "", email: "", telefono: "", rol: "", contraseña: "" });
      setMostrarFormularioNuevoCliente(false);
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      alert("No se pudo crear el cliente. Inténtalo de nuevo.");
    }
  };

  const handleNuevoVehiculo = async (e) => {
    e.preventDefault();
  
    if (!nuevoVehiculo.marca || !nuevoVehiculo.modelo || !nuevoVehiculo.placa || !nuevoVehiculo.año || !nuevoVehiculo.color) {
      alert("Por favor, completa todos los campos del vehículo.");
      return;
    }
  
    if (!clienteSeleccionado) {
      alert("Debes seleccionar un cliente para asociar el vehículo.");
      return;
    }
  
    try {
      // Llamar a la API para crear un nuevo vehículo
      const response = await api.post("/vehiculos", {
        ...nuevoVehiculo,
        id_cliente: clienteSeleccionado.id_usuario, // Asociar el vehículo al cliente seleccionado
      });
  
      alert("Vehículo creado correctamente.");
      console.log("Vehículo creado:", response.data);
  
      // Agregar el nuevo vehículo a la lista de vehículos
      setVehiculos([...vehiculos, response.data.data]);
  
      // Limpiar el formulario
      setNuevoVehiculo({ marca: "", modelo: "", placa: "", año: "", color: "" });
      setMostrarFormularioNuevoVehiculo(false);
    } catch (error) {
      console.error("Error al crear el vehículo:", error);
      alert("No se pudo crear el vehículo. Inténtalo de nuevo.");
    }
  };
  
  

  const formatFechaHora = (fechaHora) => {
    const fecha = new Date(fechaHora);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes (0-11)
    const day = String(fecha.getDate()).padStart(2, "0");
    const hours = String(fecha.getHours()).padStart(2, "0");
    const minutes = String(fecha.getMinutes()).padStart(2, "0");
    const seconds = "00"; // Segundos por defecto

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!clienteSeleccionado) {
      alert("Debes seleccionar un cliente existente.");
      return;
    }
  
    if (!idVehiculo) {
      alert("Debes seleccionar un vehículo existente.");
      return;
    }
  
    if (!tipoServicio || !fechaHora) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
  
    try {
      // Convertir la fechaHora al formato requerido por la base de datos
      const fechaHoraFormateada = formatFechaHora(fechaHora);
  
      const response = await api.post("/citas", {
        id_cliente: clienteSeleccionado.id_usuario,
        id_vehiculo: idVehiculo,
        tipo_servicio: tipoServicio,
        fecha_hora: fechaHoraFormateada,
        estado: estadoCita,
      });
  
      alert("Cita creada correctamente.");
      console.log("Cita creada:", response.data);
    } catch (error) {
      console.error("Error al crear la cita:", error);
      alert("No se pudo crear la cita. Inténtalo de nuevo.");
    }
  };
  
  return (
    <div className="details-section">
      <h1>Crear Cita</h1>

      {!mostrarFormularioNuevoCliente && (
        <div>
          <input
            className="input-busqueda"
            type="text"
            placeholder="Buscar cliente por nombre"
            value={busquedaCliente}
            onChange={(e) => setBusquedaCliente(e.target.value)}
          />
          {clientesFiltrados.length > 0 && (
            <ul className="clientes-lista">
              {clientesFiltrados.map((cliente) => (
                <li
                  key={cliente.id_usuario}
                  onClick={() => verInformacionCliente(cliente)}
                  className={
                    clienteSeleccionado?.id_usuario === cliente.id_usuario ? "selected" : ""
                  }
                >
                  {cliente.nombre} {cliente.apellido}
                </li>
              ))}
            </ul>
          )}
          <button className="btn-login" onClick={() => setMostrarFormularioNuevoCliente(true)}>
            Crear Nuevo Cliente
          </button>
        </div>
      )}

{mostrarFormularioNuevoCliente && (
  <div className="nuevo-cliente-form">
    <h3 style={{ textAlign: "center", color: "#007bff" }}>Crear Nuevo Cliente</h3>
    <form onSubmit={handleNuevoCliente} style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          value={nuevoCliente.nombre}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          placeholder="Apellido"
          value={nuevoCliente.apellido}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, apellido: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={nuevoCliente.email}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          placeholder="Teléfono"
          value={nuevoCliente.telefono}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="rol">Rol:</label>
        <select
          id="rol"
          value={nuevoCliente.rol}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, rol: e.target.value })}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "#f8f9fa",
            fontSize: "16px",
            color: "#495057",
          }}
        >
          <option value="">--Seleccionar Rol--</option>
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
          <option value="mecanico">Mecánico</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="contraseña">Contraseña:</label>
        <input
          type="password"
          id="contraseña"
          placeholder="Contraseña"
          value={nuevoCliente.contraseña}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, contraseña: e.target.value })}
          required
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
  <button className="btn-login" type="submit">
    Guardar Cliente
  </button>
  <button
    className="btn-login"
    type="button"
    onClick={() => setMostrarFormularioNuevoCliente(false)}
  >
    Cancelar
  </button>
</div>

    </form>
  </div>
)}



      {clienteSeleccionado && (
        <div ref={vehiculosRef}>
          <h2>
            Vehículos y Servicios de {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
          </h2>
          <div className="vehiculos-container">
            {vehiculos.map((vehiculo) => (
              <div
                key={vehiculo.id_vehiculo}
                className={`card ${idVehiculo === vehiculo.id_vehiculo ? "selected" : ""}`}
                onClick={() => setIdVehiculo(vehiculo.id_vehiculo)}
              >
                <h3>
                  {vehiculo.marca} {vehiculo.modelo} ({vehiculo.año})
                </h3>
                <img
                  src={`http://localhost:8000/img/${vehiculo.marca}.png`}
                  alt={vehiculo.modelo}
                  className="imagenMarca"
                />
                <h4>Datos del vehículo</h4>
                <ul>
                  <li>Placa: {vehiculo.placa}</li>
                  <li>Modelo: {vehiculo.modelo}</li>
                  <li>Año: {vehiculo.año}</li>
                </ul>
              </div>
            ))}

            <div
              className={`card add-card ${mostrarFormularioNuevoVehiculo ? "selected" : ""}`}
              onClick={() => setMostrarFormularioNuevoVehiculo(true)}
            >
              <h3>+</h3>
              <p>Añadir nuevo vehículo</p>
            </div>
          </div>
          {mostrarFormularioNuevoVehiculo && (
  <div className="nuevo-vehiculo-form">
    <h3 style={{ textAlign: "center", color: "#007bff" }}>Crear Nuevo Vehículo</h3>
    <form onSubmit={handleNuevoVehiculo} style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div className="form-group">
        <label htmlFor="marca">Marca:</label>
        <input
          type="text"
          id="marca"
          placeholder="Marca"
          value={nuevoVehiculo.marca}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, marca: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="modelo">Modelo:</label>
        <input
          type="text"
          id="modelo"
          placeholder="Modelo"
          value={nuevoVehiculo.modelo}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, modelo: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="placa">Placa:</label>
        <input
          type="text"
          id="placa"
          placeholder="Placa"
          value={nuevoVehiculo.placa}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, placa: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="año">Año:</label>
        <input
          type="number"
          id="año"
          placeholder="Año"
          value={nuevoVehiculo.año}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, año: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          placeholder="Color"
          value={nuevoVehiculo.color}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, color: e.target.value })}
          required
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
  <button className="btn-login" type="submit">
    Guardar Vehículo
  </button>
  <button
    className="btn-login"
    type="button"
    onClick={() => setMostrarFormularioNuevoVehiculo(false)}
  >
    Cancelar
  </button>
</div>
            
    </form>
  </div>
)}


        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo de Servicio:</label>
          <input
            className="input-busqueda"
            type="text"
            value={tipoServicio}
            onChange={(e) => setTipoServicio(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha y Hora:</label>
          <input
            className="input-busqueda"
            type="datetime-local"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
          />
        </div>
        <div>
          <label>Estado de la Cita:</label>
          <select
            className="input-busqueda"
            value={estadoCita}
            onChange={(e) => setEstadoCita(e.target.value)}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Completada">Completada</option>
            <option value="Cancelada">Cancelada</option>
            <option value="Asignada">Asignada</option>
          </select>
        </div>

        <button className="btn-login" type="submit">
          Crear Cita
        </button>
      </form>
    </div>
  );
};

export default CrearCita;
