import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar.jsx";

const SpaceDetails = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4; // Número de comentarios por página
  const [newComment, setNewComment] = useState("");
  const [newScore, setNewScore] = useState(5);
  const [newImages, setNewImages] = useState([""]);
  const [regnumber, setRegnumber] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [language, setLanguage] = useState("ES"); // Idioma actual (por defecto: español)
  const [colorBlindMode, setColorBlindMode] = useState(false); // Modo daltónico


  useEffect(() => {
    fetchSpaceDetails();
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
      generateGalleryImages();
    } catch (error) {
      console.error("Error al obtener los detalles del espacio:", error);
    } finally {
      setLoading(false);
    }
  };
const getTranslatedDescription = () => {
    switch (language) {
      case "EN":
        return space?.observation_EN || "No description available.";
      case "CA":
        return space?.observation_CA || "No hi ha descripció disponible.";
      default:
        return space?.observation_ES || "No hay descripción disponible.";
    }
  };
  const checkLoginStatus = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.email) {
        setIsLoggedIn(true);
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
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const generateGalleryImages = () => {
    const imageSources = Array.from(
      { length: 5 },
      (_, i) => `/spaceimg/${i + 1}.jpg`
    );
    setGalleryImages(imageSources);
    setSelectedImage(imageSources[0]);
  };

  const handleAddImageField = () => {
    setNewImages([...newImages, ""]);
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newImages];
    updatedImages[index] = value;
    setNewImages(updatedImages);
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
          images: newImages.filter((url) => url.trim() !== ""),
          status: "N",
        },
      ],
    };

    try {
      console.log("Usando regnumber:", regnumber);
      await axios.post(
        `http://127.0.0.1:8000/api/space/${regnumber}/comments`,
        commentData
      );
      setNewComment("");
      setNewScore(5);
      setNewImages([""]);
      fetchSpaceDetails();
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
      alert(
        "Ocurrió un error al enviar el comentario. Por favor, inténtalo más tarde."
      );
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;

  if (!space)
    return <p className="text-center text-red-500">Espacio no encontrado.</p>;

  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{space.name} </h1>
          {/* Banderas para cambiar el idioma */}
          <div className="flex space-x-2 mt-4">
            <button onClick={() => setLanguage("ES")}>
              <img src="/flags/es.png" alt="Español" className="w-8 h-6" />
            </button>
            <button onClick={() => setLanguage("EN")}>
              <img src="/flags/en.png" alt="English" className="w-8 h-6" />
            </button>
            <button onClick={() => setLanguage("CA")}>
              <img src="/flags/ca.png" alt="Català" className="w-8 h-6" />
            </button>
          </div>
         <p className="text-gray-600 mt-3">{getTranslatedDescription()}</p>

          <div className="grid grid-cols-1 md:grid-cols-4 text-center gap-4 mt-4">
     
            <p className="text-gray-600">
              <strong>📍 Ubicación:</strong> {space.address?.municipality?.name}
              , {space.address?.municipality?.island?.name}
            </p>
            <p className="text-gray-600">
              <strong>📞 Teléfono:</strong> {space.telefono || "No disponible"}
            </p>
            <p className="text-gray-600">
              <strong >📧 Email:</strong> {space.email || "No disponible"}
            </p>
            <p className="text-gray-600">
              <strong>🌐 Web:</strong>{" "}
              {space.web ? (
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

        {/* Galería de Imágenes */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-700">Galería</h2>
          <div className="flex flex-col items-center mt-4">
            <img
              src={selectedImage}
              alt="Imagen principal"
              className="w-full max-w-2xl h-80 object-cover rounded shadow-md"
            />
            <div className="flex space-x-2 mt-4">
              {galleryImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Miniatura ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    src === selectedImage
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(src)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sección para Añadir Comentario */}
        {isLoggedIn ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-700">
              Añadir Comentario
            </h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Escribe tu comentario aquí..."
                required
              ></textarea>

              <div className="flex items-center mt-4">
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

              <div className="mt-4">
                <label className="text-gray-700 font-medium">
                  Imágenes (URLs):
                </label>
                {newImages.map((url, index) => (
                  <input
                    key={index}
                    type="text"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="URL de la imagen"
                  />
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
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                Enviar comentario
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-red-100 p-6 rounded-lg shadow-md mb-8 text-center">
            <h2 className="text-xl font-bold text-red-700">
              Debes iniciar sesión para comentar
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
              para poder añadir comentarios.
            </p>
          </div>
        )}

        {/* Comentarios con paginación */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700">Comentarios</h2>

          {comments.filter((comment) => comment.status === "P").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {comments
                .filter((comment) => comment.status === "P") // Filtrar solo los comentarios con status "P"
                .slice(indexOfFirstComment, indexOfLastComment) // Aplicar paginación
                .map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200 flex items-center"
                  >
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium italic">
                        {comment.comment}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm font-medium text-gray-600 mr-2">
                          Puntuación:
                        </span>
                        {[...Array(comment.score)].map((_, i) => (
                          <span key={i} className="text-yellow-500">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>Usuario:</strong>{" "}
                        {comment.userName || "Anónimo"}
                      </p>
                    </div>
                    {comment.image?.length > 0 && (
                      <img
                        src={comment.image[0].url}
                        alt="Imagen"
                        className="w-24 h-24 object-cover rounded-lg ml-4"
                      />
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-4">
              No hay comentarios aprobados aún.
            </p>
          )}
          {/* Paginación */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed "
            >
              Anterior
            </button>
            <p className="text-gray-600">
              Página {currentPage} de {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetails;
