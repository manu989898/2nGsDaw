import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./NavBar.jsx";

const ProfileWithComments = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role_id: "",
  });
  const [comments, setComments] = useState([]); // Lista de comentarios del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de sesión
  const [userId, setUserId] = useState(null); // ID del usuario logueado

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserComments();
    }
  }, [userId]);

  const checkLoginStatus = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.email) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/email/${storedUser.email}`
        );
        const user = response.data.data;
        setUserId(user.id); // Guardar el ID del usuario
        setUserData({
          name: user.name || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          password: "", // No cargar la contraseña por seguridad
          role_id: user.role_id || "",
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error al verificar el estado de inicio de sesión:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/user/${userId}`,
        userData
      );
      alert("Perfil actualizado con éxito");
      console.log("Datos actualizados:", response.data);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil");
    }
  };

  const fetchUserComments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/comment/user/${userId}`
      );
      const comments = response.data.data;

      // Obtener nombres de los espacios usando space_id
      const enrichedComments = await Promise.all(
        comments.map(async (comment) => {
          if (comment.space_id) {
            try {
              const spaceResponse = await axios.get(
                `http://127.0.0.1:8000/api/space/${comment.space_id}`
              );
              return {
                ...comment,
                spaceName: spaceResponse.data.data.name,
              };
            } catch (error) {
              console.error("Error al obtener el espacio con ID ${comment.space_id}:", error);
              return { ...comment, spaceName: "Espacio no disponible" };
            }
          }
          return { ...comment, spaceName: "No especificado" };
        })
      );

      setComments(enrichedComments);
    } catch (error) {
      console.error("Error al obtener los comentarios del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando datos...</p>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center text-gray-500">
          Debes iniciar sesión para acceder a esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-md mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-semibold"
            >
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={userData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={userData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role_id"
              className="block text-gray-700 font-semibold"
            >
              Rol (ID)
            </label>
            <input
              type="text"
              id="role_id"
              name="role_id"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={userData.role_id}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-md mt-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Tus Comentarios</h2>
        {comments.length === 0 ? (
          <p className="text-center text-gray-500">
            No has realizado ningún comentario aún.
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-4 rounded shadow-md border border-gray-200"
              >
                <p className="text-gray-800 font-semibold">{comment.comment}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-gray-600 mr-2">
                    <strong>Puntuación:</strong>
                  </span>
                  {[...Array(comment.score)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                  {[...Array(5 - comment.score)].map((_, i) => (
                    <span key={i} className="text-gray-300">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Espacio:</strong> {comment.spaceName}
                </p>
                {comment.image && comment.image.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {comment.image.map((img) => (
                      <img
                        key={img.id}
                        src={img.url}
                        alt={`Comentario imagen ${img.id}`}
                        className="w-full h-20 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "/default-image.jpg"; // Imagen por defecto si falla
                        }}
                      />
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Publicado el {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileWithComments;
