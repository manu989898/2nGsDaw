import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar.jsx";

const SpaceDetails = () => {
  const { id } = useParams(); // Obtener el `id` del espacio desde la URL
  const [space, setSpace] = useState(null); // Detalles del espacio
  const [loading, setLoading] = useState(true); // Estado de carga
  const [comments, setComments] = useState([]); // Lista de comentarios
  const [newComment, setNewComment] = useState(""); // Nuevo comentario
  const [newScore, setNewScore] = useState(5); // Nueva puntuación
  const [newImages, setNewImages] = useState([""]); // URLs de imágenes
  const [regnumber, setRegnumber] = useState(null); // `RegNumber` del espacio
  const [userId, setUserId] = useState(null); // ID del usuario logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de sesión del usuario
  const [galleryImages, setGalleryImages] = useState([]); // Imágenes de la galería
  const [selectedImage, setSelectedImage] = useState(""); // Imagen seleccionada en grande

  useEffect(() => {
    fetchSpaceDetails();
    generateRandomImages();
    checkLoginStatus();
  }, []);

  const fetchSpaceDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/space/${id}`);
      const spaceData = response.data.data;
      setSpace(spaceData);
      setRegnumber(spaceData.RegNumber);

      const commentsWithDetails = await Promise.all(
        spaceData.comentaris.map(async (comment) => {
          const commentResponse = await axios.get(
            `http://127.0.0.1:8000/api/comment/${comment.id}`
          );
          const commentData = commentResponse.data.data;

          const userResponse = await axios.get(
            `http://127.0.0.1:8000/api/user/id/${commentData.user_id}`
          );
          const userData = userResponse.data.data;

          return { ...commentData, userName: userData.name };
        })
      );

      setComments(commentsWithDetails);
    } catch (error) {
      console.error("Error al obtener los detalles del espacio:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.email) {
        setIsLoggedIn(true);

        // Obtener el user_id desde el email
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/email/${storedUser.email}`
        );
        setUserId(response.data.data.id);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error al verificar el estado de inicio de sesión:", error);
      setIsLoggedIn(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!regnumber) {
      console.error("No se encontró el RegNumber del espacio.");
      return;
    }

    if (!userId) {
      console.error("No se encontró el user_id. Debes iniciar sesión.");
      return;
    }

    const commentData = {
      user_id: userId,
      comments: [
        {
          comment: newComment,
          score: newScore,
          images: newImages.filter((url) => url.trim() !== ""), // Filtrar URLs vacías
          status: 'P',
        },
      ],
    };

    try {
      console.log("Usando regnumber:", regnumber);
      await axios.post(
        `http://127.0.0.1:8000/api/space/${regnumber}/comments`,
        commentData
      );
      setNewComment(""); // Limpiar el comentario
      setNewScore(5); // Restablecer la puntuación
      setNewImages([""]); // Limpiar las imágenes
      fetchSpaceDetails(); // Actualizar los detalles del espacio
      console.log(commentData);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };
  const generateRandomImages = () => {
    const imageSources = Array.from({ length: 5 }, () => {
      const randomIndex = Math.floor(Math.random() * 10) + 1; // Generar un número entre 1 y 10
      return `/spaceimg/${randomIndex}.jpg`; // Ruta a las imágenes
    });
    setGalleryImages(imageSources);
    setSelectedImage(imageSources[0]); // Establecer la primera imagen como seleccionada
  };
  const handleAddImageField = () => {
    setNewImages([...newImages, ""]); // Añadir un nuevo campo para imágenes
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newImages];
    updatedImages[index] = value;
    setNewImages(updatedImages);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  if (!space) {
    return <p className="text-center text-red-500">Espacio no encontrado.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{space.name}</h1>
          <p className="mt-4 text-gray-600">
            {space.observation_ES || "No hay descripción disponible."}
          </p>
          {/* Galería de Imágenes */}
          <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-8">Galería</h2>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <img
                src={selectedImage}
                alt="Imagen principal"
                className="w-full max-w-lg h-64 object-cover rounded shadow-md"
              />
            </div>
            <div className="flex space-x-4">
              {galleryImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Miniatura ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    src === selectedImage ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(src)}
                />
              ))}
            </div>
        </div>
          <div className="mt-6">
            <p className="text-gray-600">
              <strong>Teléfono:</strong> {space.telefono || "No disponible"}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {space.email || "No disponible"}
            </p>
            <p className="text-gray-600">
              <strong>Web:</strong> {space.web ? (
                <a
                  href={`http://${space.web}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {space.web}
                </a>
              ) : (
                "No disponible"
              )}
            </p>
          </div>

        </div>

        <div className="bg-white rounded shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Añadir un comentario
          </h2>
          {isLoggedIn ? (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Escribe tu comentario aquí..."
                required
              ></textarea>
              <div className="flex items-center mb-4">
                <label className="mr-2 text-gray-700 font-medium">
                  Puntuación:
                </label>
                <select
                  value={newScore}
                  onChange={(e) => setNewScore(Number(e.target.value))}
                  className="border border-gray-300 rounded p-1"
                >
                  {[1, 2, 3, 4, 5].map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-medium">
                  Imágenes (URLs):
                </label>
                {newImages.map((url, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mr-2"
                      placeholder="URL de la imagen"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddImageField}
                  className="text-blue-500 mt-2"
                >
                  Añadir otra imagen
                </button>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Enviar comentario
              </button>
            </form>
          ) : (
            <p className="text-gray-500">
              Debes iniciar sesión para comentar.
            </p>
          )}
        </div>

        <div className="bg-white rounded shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Comentarios</h2>
          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="bg-gray-50 p-4 rounded shadow-md border border-gray-200"
                >
                  <p className="text-gray-800 font-semibold">
                    {comment.comment}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm font-medium text-gray-600 mr-2">
                      <strong>Puntuación:</strong>
                    </span>
                    {[...Array(comment.score)].map((_, index) => (
                      <span key={index} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                    {[...Array(5 - comment.score)].map((_, index) => (
                      <span key={index} className="text-gray-300">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Usuario:</strong>{" "}
                    {comment.userName || "Desconocido"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Publicado el{" "}
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                  {comment.image && comment.image.length > 0 && (
                    <div className="mt-2">
                      <strong>Imágenes:</strong>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {comment.image.map((img) => (
                          <img
                            key={img.id}
                            src={img.url}
                            alt={`Imagen del comentario ${img.id}`}
                            className="w-full rounded object-cover"
                            onError={(e) => {
                              e.target.src = "/default-image.jpg"; // Imagen por defecto si falla
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hay comentarios disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceDetails;
