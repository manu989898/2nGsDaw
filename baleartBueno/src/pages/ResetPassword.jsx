import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordRecuperar = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role_id: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Obtener usuario por email
      const response = await axios.get(`http://127.0.0.1:8000/api/user/email/${userData.email}`);
      const user = response.data.data; // Acceder correctamente a los datos del usuario

      console.log("Usuario encontrado:", user);

      if (!user || !user.id) {
        alert("El usuario no existe");
        console.log("Usuario no encontrado:", user);
        return;
      }

      // Verificar que los datos ingresados coincidan con los del usuario registrado
      if (
        user.name !== userData.name ||
        user.lastName !== userData.lastName ||
        user.email !== userData.email ||
        user.phone !== userData.phone
      ) {
        alert("Los datos proporcionados no coinciden con los registrados.");
        return;
      }

      // Preparar los datos para actualizar
      const updatedUserData = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: newPassword, // Nueva contraseña
        role_id: user.role_id, // Asegurar que role_id está presente
      };

      // Enviar actualización al servidor
      const updateResponse = await axios.put(
        `http://127.0.0.1:8000/api/user/${user.id}`,
        updatedUserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta de actualización:", updateResponse.data);

      if (updateResponse.data.message === "User updated") {
        alert("Contraseña actualizada correctamente");
        navigate("/auth");
      } else {
        alert("Error al actualizar la contraseña. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error.response?.data || error.message);
      alert("Hubo un error al actualizar la contraseña. Revisa la consola para más detalles.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Recuperar Contraseña</h1>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Nombre</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Apellido</label>
            <input
              type="text"
              name="lastName"
              className="w-full px-4 py-2 border rounded"
              value={userData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Teléfono</label>
            <input
              type="text"
              name="phone"
              className="w-full px-4 py-2 border rounded"
              value={userData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Nueva Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Confirmar Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50">
            Restablecer Contraseña
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/login" className="text-blue-500 hover:underline">Volver al inicio de sesión</a>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecuperar;
