import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar.jsx";

const Spaces = () => {
  const [spaces, setSpaces] = useState([]); // Lista de espacios
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [language, setLanguage] = useState("ES"); // Idioma actual (por defecto: español)
  const [island, setIsland] = useState("Mallorca"); // Isla seleccionada
  const [accessibilityFilter, setAccessibilityFilter] = useState(false); // Filtro de accesibilidad activado/desactivado

  const navigate = useNavigate();

  // Lista de islas disponibles
  const islands = [
    "Mallorca",
    "Menorca",
    "Eivissa",
    "Formentera",
    "Cabrera",
    "Dragonera",
  ];

  useEffect(() => {
    fetchSpaces(island);
  }, [island, accessibilityFilter]);

  const fetchSpaces = async (islandName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/space/island/${islandName}`
      );
      let sortedSpaces = response.data.data.sort((a, b) => {
        const scoreA = parseFloat(a.totalScore) || 0;
        const scoreB = parseFloat(b.totalScore) || 0;
        return scoreB - scoreA;
      });

      // Aplicar filtro de accesibilidad si está activado
      if (accessibilityFilter) {
        sortedSpaces = sortedSpaces.filter((space) =>
          ["S", "P"].includes(space.accessType)
        );
      }

      setSpaces(sortedSpaces); // Guarda los espacios filtrados
      setTotalPages(Math.ceil(sortedSpaces.length / 4)); // Calcula el total de páginas
      setCurrentPage(1); // Reinicia a la primera página al cambiar de isla
    } catch (error) {
      console.error("Error al obtener los espacios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleSpaceClick = (spaceId) => {
    navigate(`/space/${spaceId}`); // Redirigir a la página de detalles
  };

  const renderObservation = (space) => {
    switch (language) {
      case "EN":
        return space.observation_EN || "No description available.";
      case "CA":
        return space.observation_CA || "No hi ha descripció disponible.";
      default:
        return space.observation_ES || "No hay descripción disponible.";
    }
  };

  const renderScoreWithStar = (score) => {
    return (
      <div className="flex items-center">
        <span className="text-gray-800 font-semibold mr-2">{score}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-yellow-500"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
    );
  };
  const [searchQuery, setSearchQuery] = useState(""); // Search bar query

  const filteredSpaces = spaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) && // Filter by name
      (!accessibilityFilter || ["S", "P"].includes(space.accessType)) // Filter by accessibility
  );

  const displayedSpaces = filteredSpaces.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        {" "}
        {/* Contenedor centralizado */}
        <h1 className="text-3xl font-bold text-center mb-6">Espacios</h1>
        {/* Selector de idioma */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setLanguage("ES")}
            className={`px-4 py-2 rounded-l bg-gray-200 hover:bg-gray-300 ${
              language === "ES" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
          >
            <img src="/flags/es.png" alt="Español" className="w-8 h-6 inline" />
          </button>
          <button
            onClick={() => setLanguage("EN")}
            className={`px-4 py-2 bg-gray-200 hover:bg-gray-300 ${
              language === "EN" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
          >
            <img src="/flags/en.png" alt="English" className="w-8 h-6 inline" />
          </button>
          <button
            onClick={() => setLanguage("CA")}
            className={`px-4 py-2 rounded-r bg-gray-200 hover:bg-gray-300 ${
              language === "CA" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
          >
            <img src="/flags/ca.png" alt="Català" className="w-8 h-6 inline" />
          </button>
        </div>
        {/* Filter section */}
        <div className="flex justify-center items-center gap-4 mb-6">
          {/* Selector de isla */}
          <div className="flex items-center">
            <label
              htmlFor="island"
              className="text-lg font-semibold text-gray-700 mr-4"
            >
              Filtrar por isla:
            </label>
            <select
              id="island"
              value={island}
              onChange={(e) => setIsland(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
            >
              {islands.map((island) => (
                <option key={island} value={island}>
                  {island}
                </option>
              ))}
            </select>
          </div>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
          />

          {/* Accessibility filter */}
          <button
            onClick={() => setAccessibilityFilter((prev) => !prev)}
            className={`px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all ${
              accessibilityFilter
                ? "bg-blue-500 text-white ring-blue-300"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {accessibilityFilter
              ? "Accesible: Activado"
              : "Accesible: Desactivado"}
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : spaces.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay espacios disponibles.
          </p>
        ) : (
          <>
            <div className="mb-8">
              {/* Destacado */}
              {displayedSpaces[0] && (
                <div
                  className="bg-white rounded shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleSpaceClick(displayedSpaces[0].id)}
                >
                  <h2 className="text-2xl font-bold text-gray-700">
                    {displayedSpaces[0].name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {renderObservation(displayedSpaces[0])}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    <strong>Modalidades:</strong>{" "}
                    {displayedSpaces[0].modalitats.length > 0
                      ? displayedSpaces[0].modalitats
                          .map((mod) => mod.name)
                          .join(", ")
                      : "N/A"}
                  </p>
                  {renderScoreWithStar(displayedSpaces[0].totalScore || 0)}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tres espacios pequeños */}
              {displayedSpaces.slice(1).map((space) => (
                <div
                  key={space.id}
                  className="bg-white rounded shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleSpaceClick(space.id)}
                >
                  <h3 className="text-lg font-bold text-gray-700">
                    {space.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {renderObservation(space)}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    <strong>Modalidades:</strong>{" "}
                    {space.modalitats.length > 0
                      ? space.modalitats.map((mod) => mod.name).join(", ")
                      : "N/A"}
                  </p>
                  {renderScoreWithStar(space.totalScore || 0)}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <p className="text-gray-600">
                Página {currentPage} de {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Spaces;
