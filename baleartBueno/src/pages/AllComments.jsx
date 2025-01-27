import { useState, useEffect } from "react";
import axios from "axios";

const AllComments = () => {
  const [comments, setComments] = useState([]); // Lista de todos los comentarios
  const [loading, setLoading] = useState(true); // Estado de carga
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de sesión
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const commentsPerPage = 2; // Número de comentarios por página

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

      // Obtener nombres de los usuarios y espacios
      const enrichedComments = await Promise.all(
        comments.map(async (comment) => {
          let userName = "Desconocido";
          if (comment.user_id) {
            try {
              const userResponse = await axios.get(
                `http://127.0.0.1:8000/api/user/id/${comment.user_id}`
              );
              userName = userResponse.data.data.name;
            } catch (error) {
              console.error(`Error al obtener el usuario con ID ${comment.user_id}:`, error);
            }
          }

          let spaceName = "No especificado";
          if (comment.space_id) {
            try {
              const spaceResponse = await axios.get(
                `http://127.0.0.1:8000/api/space/${comment.space_id}`
              );
              spaceName = spaceResponse.data.data.name;
            } catch (error) {
              console.error(`Error al obtener el espacio con ID ${comment.space_id}:`, error);
            }
          }

          return {
            ...comment,
            userName,
            spaceName,
          };
        })
      );

      setComments(enrichedComments.reverse());
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        <p className="text-center mt-20 text-gray-500">
          Debes iniciar sesión para ver los comentarios.
        </p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <p className="text-center mt-20 h-800 text-gray-500">
          Cargando comentarios...
        </p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <p className="text-center text-gray-500">
          No hay comentarios disponibles en la base de datos.
        </p>
      </div>
    );
  }

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <div className="bg-gray-300 p-5">
        <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">
          Todos los Comentarios
        </h1>
        <div className="space-y-4">
          {currentComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded shadow-md border border-gray-200"
            >
              <p className="text-gray-800 font-semibold italic">
                {comment.comment.length > 80
                  ? `${comment.comment.substring(0, 80)}...`
                  : comment.comment}
              </p>
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
              <p className="text-sm text-gray-600">
                <strong>Usuario:</strong> {comment.userName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Espacio:</strong> {comment.spaceName}
              </p>
              {comment.image && comment.image.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {comment.image.map((img) => (
                    <img
                      key={img.id}
                      src={img.url}
                      alt={`Comentario imagen ${img.id}`}
                      className="w-32  object-cover rounded"
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

        <div className="flex justify-center items-center mt-6 gap-4">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Anterior
  </button>
  <p className="text-gray-600">
    Página {currentPage} de {totalPages}
  </p>
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Siguiente
  </button>
</div>
      </div>
  );
};

export default AllComments;
