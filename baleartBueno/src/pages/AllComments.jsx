import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./NavBar.jsx";

const AllComments = () => {
  const [comments, setComments] = useState([]); // Lista de todos los comentarios
  const [loading, setLoading] = useState(true); // Estado de carga
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de sesión

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllComments();
    }
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.email) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/email/${storedUser.email}`
        );
        setIsLoggedIn(!!response.data.data.id); // Verifica si hay un usuario válido
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error al verificar el estado de inicio de sesión:", error);
      setIsLoggedIn(false);
    }
  };

  const fetchAllComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comment`);
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
              console.error(`Error al obtener el espacio con ID ${comment.space_id}:`, error);
              return { ...comment, spaceName: "Espacio no disponible" };
            }
          }
          return { ...comment, spaceName: "No especificado" };
        })
      );

      setComments(enrichedComments);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center text-gray-500">
          Debes iniciar sesión para ver los comentarios.
        </p>
      </div>
    );
  }
  if (loading) {
    return <div className="min-h-screen bg-gray-100">
        <Navbar />
    <p className="text-center text-gray-500">Cargando comentarios...</p>;
    </div>
  }


  if (comments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="text-center text-gray-500">
          No hay comentarios disponibles en la base de datos.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Todos los Comentarios
        </h1>
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
      </div>
    </div>
  );
};

export default AllComments;
