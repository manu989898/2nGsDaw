import { useState, useEffect } from "react";
import axios from "axios";

const AllComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

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
        setIsLoggedIn(!!response.data.data.id);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error al verificar sesión:", error);
      setIsLoggedIn(false);
    }
  };

  const fetchAllComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comment`);
      const comments = response.data.data;

      const enrichedComments = await Promise.all(
        comments.map(async (comment) => {
          let userName = "Desconocido";
          let spaceName = "No especificado";

          try {
            if (comment.user_id) {
              const userResponse = await axios.get(
                `http://127.0.0.1:8000/api/user/id/${comment.user_id}`
              );
              userName = userResponse.data.data.name;
            }
            if (comment.space_id) {
              const spaceResponse = await axios.get(
                `http://127.0.0.1:8000/api/space/${comment.space_id}`
              );
              spaceName = spaceResponse.data.data.name;
            }
          } catch (error) {
            console.error("Error al obtener datos adicionales:", error);
          }

          return { ...comment, userName, spaceName };
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
      <div className="bg-red-100 p-6 shadow-md  text-center">
      <h2 className="text-xl font-bold text-red-700">
        Debes iniciar sesión para ver los comentarios
      </h2>
      <p className="text-gray-600 mt-2">
        Por favor,
        <a href="/auth" className="underline">
          {" "}
          inicia sesión
        </a>{" "}
        o{" "}
        <a href="/register" className="underline">
          crea una cuenta
        </a>{" "}
        para poder ver los comentarios.
      </p>
    </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-50 bg-gray-100">
        <p className="text-center mt-20 text-gray-500">Cargando comentarios...</p>
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
    <div className="bg-gray-300 p-6 mt-8 rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
        Todos los Comentarios
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center"
          >
            {/* Contenedor de texto */}
            <div className="flex-1">
              <p className="text-gray-800 font-medium italic">
                {comment.comment.length > 100
                  ? `${comment.comment.substring(0, 100)}...`
                  : comment.comment}
              </p>

              {/* Puntuación con estrellas */}
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

              <p className="text-xs text-gray-500 mt-2">
                Publicado el {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Imagen alineada a la derecha */}
            {comment.image && comment.image.length > 0 && (
              <div className="ml-4">
                <img
                  src={comment.image[0].url}
                  alt={`Imagen comentario`}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "/default-image.jpg";
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <p className="text-gray-600">
          Página {currentPage} de {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AllComments;
