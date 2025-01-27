import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar.jsx";
import AllComments from "./AllComments.jsx"; // Importación del componente AllComments

const Spaces = () => {
  const [spaces, setSpaces] = useState([]); // Lista de espacios
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [language, setLanguage] = useState("ES"); // Idioma actual (por defecto: español)
  const [island, setIsland] = useState("Mallorca"); // Isla seleccionada
  const [accessibilityFilter, setAccessibilityFilter] = useState(false); // Filtro de accesibilidad
  const [searchQuery, setSearchQuery] = useState(""); // Filtro de búsqueda por nombre
  const [selectedModality, setSelectedModality] = useState(""); // Modalidad seleccionada
 const [filtersVisible, setFiltersVisible] = useState(true); // Estado para mostrar/ocultar filtros
  const [municipality, setMunicipality] = useState(""); // Municipio seleccionado
  const [municipalities, setMunicipalities] = useState([]); // Lista de municipios según la isla
  const navigate = useNavigate();
  const [spaceImages, setSpaceImages] = useState([]); // Lista de imágenes de los espacios

  const islands = [
    "Mallorca",
    "Menorca",
    "Eivissa",
    "Formentera",
    "Cabrera",
    "Dragonera",
  ];

  useEffect(() => {
    fetchSpaces(island, municipality);
  }, [island, municipality, accessibilityFilter, selectedModality]);

  const fetchSpaces = async (islandName, municipalityName) => {
    setLoading(true);
    try {
      // Cargar las imágenes primero
      const imageResponse = await axios.get("/spaces.json");
      const loadedImages = imageResponse.data;
      setSpaceImages(loadedImages);

      // Luego cargar los espacios
      const response = await axios.get(
        `http://127.0.0.1:8000/api/space/island/${islandName}`
      );
      console.log("Espacios recibidos de la API:", response.data.data);

      let filteredSpaces = response.data.data;

      // Filtrar por municipio si se proporciona
      if (municipalityName && municipalityName !== "") {
        filteredSpaces = filteredSpaces.filter(
          (space) => space.address.municipality.name === municipalityName
        );
      }

      // Extraer nombres únicos de municipios
      const uniqueMunicipalities = Array.from(
        new Set(filteredSpaces.map((space) => space.address.municipality.name))
      );
      setMunicipalities(uniqueMunicipalities);

      // Ordenar los espacios por puntuación
      filteredSpaces = filteredSpaces.sort((a, b) => {
        const scoreA = parseFloat(a.totalScore) || 0;
        const scoreB = parseFloat(b.totalScore) || 0;
        return scoreB - scoreA; // Orden descendente
      });

      // Asignar imágenes a los espacios
      const spacesWithImages = filteredSpaces.map((space) => {
        const matchingImage = loadedImages.find(
          (img) =>
            img.registre.trim().toLowerCase() ===
            space.RegNumber.trim().toLowerCase()
        );

        return {
          ...space,
          image: matchingImage ? matchingImage.image : "./spaceimg/1.jpg",
        };
      });

      setSpaces(spacesWithImages);
      setTotalPages(Math.ceil(spacesWithImages.length / 4));
      setCurrentPage(1);
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
    navigate(`/space/${spaceId}`);
  };

  const renderObservation = (space, isFeatured) => {
    const truncate = (text, length) => {
      return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const maxLength = isFeatured ? 1280 : 140;

    switch (language) {
      case "EN":
        return truncate(
          space.observation_EN || "No description available.",
          maxLength
        );
      case "CA":
        return truncate(
          space.observation_CA || "No hi ha descripció disponible.",
          maxLength
        );
      default:
        return truncate(
          space.observation_ES || "No hay descripción disponible.",
          maxLength
        );
    }
  };

  const renderScoreWithStar = (score, commentsCount) => {
    return (
      <div className="flex items-center">
        <span className="text-gray-800 font-semibold mr-2">{score}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-yellow-500 mr-2"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span className="text-sm text-gray-600">
          ({commentsCount} comentarios)
        </span>
      </div>
    );
  };

  const allModalities = Array.from(
    new Set(spaces.flatMap((space) => space.modalitats.map((mod) => mod.name)))
  );

  const filteredSpaces = spaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!accessibilityFilter || ["S", "P"].includes(space.accessType))
  );

  const displayedSpaces = filteredSpaces.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <div className="flex-grow p-4">
          {/* Botón para mostrar/ocultar filtros Actualmente desactivado para que se muestre siempre
 <div className="text-center mb-4">
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
        >
          {filtersVisible ? "Ocultar Filtros" : "Filtros"}
        </button>
      </div>

      */}

          {/* Contenedor de filtros desplegable */}
          {filtersVisible && (
            <div className="bg-white p-4 rounded shadow-md mb-6">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="flex items-center gap-4 ">
                  <div className="flex items-center">
                    <label
                      htmlFor="island"
                      className="text-lg font-semibold text-gray-700 mr-4"
                    >
                      Isla:
                    </label>
                    <select
                      id="island"
                      value={island}
                      onChange={(e) => {
                        setIsland(e.target.value);
                        setMunicipality(""); // Reinicia el municipio al cambiar de isla
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                      {islands.map((island) => (
                        <option key={island} value={island}>
                          {island}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    {/* Label de municipios (oculto por estetica)
                  <label
                    htmlFor="municipality"
                    className="text-lg font-semibold text-gray-700 mr-4"
                  >
                    Municipio:
                  </label>
                  */}
                    <select
                      id="municipality"
                      value={municipality}
                      onChange={(e) => setMunicipality(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                      <option value="">Municipios</option>
                      {municipalities.map((mun) => (
                        <option key={mun} value={mun}>
                          {mun}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="min-w-[200px] flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  />

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

                  <div className="flex items-center">
                    {/* Label de modalidades (oculto por estetica)}
    <label
      htmlFor="modality"
      className="text-lg font-semibold text-gray-700 mr-4"
    >
      Modalidad:
    </label>
    */}
                    <select
                      id="modality"
                      value={selectedModality}
                      onChange={(e) => setSelectedModality(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                      <option value="">Modalidades</option>
                      {allModalities.map((modality) => (
                        <option key={modality} value={modality}>
                          {modality}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLanguage("ES")}
                      className={`px-4 py-2 rounded-l bg-gray-200 hover:bg-gray-300 ${
                        language === "ES"
                          ? "bg-blue-500 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <img
                        src="/flags/es.png"
                        alt="Español"
                        className="w-8 h-6"
                      />
                    </button>
                    <button
                      onClick={() => setLanguage("EN")}
                      className={`px-4 py-2 bg-gray-200 hover:bg-gray-300 ${
                        language === "EN"
                          ? "bg-blue-500 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <img
                        src="/flags/en.png"
                        alt="English"
                        className="w-8 h-6"
                      />
                    </button>
                    <button
                      onClick={() => setLanguage("CA")}
                      className={`px-4 py-2 rounded-r bg-gray-200 hover:bg-gray-300 ${
                        language === "CA"
                          ? "bg-blue-500 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <img
                        src="/flags/ca.png"
                        alt="Català"
                        className="w-8 h-6"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h1 className="text-3xl font-bold text-center mb-6">Espacios</h1>
          {loading ? (
            <p className="text-center text-gray-500">Cargando...</p>
          ) : spaces.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay espacios disponibles.
            </p>
          ) : (
            <>
              <div className="mb-8 px-20">
                {displayedSpaces[0] && (
                  <div
                    className="bg-white rounded shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleSpaceClick(displayedSpaces[0].id)}
                  >
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">
                      {displayedSpaces[0].name}
                    </h2>
                    <img
                      src={displayedSpaces[0].image}
                      alt="Imagen del espacio"
                      className="w-full h-64 object-cover rounded mb-4"
                    />
                    <p className="text-gray-600 text-sm mb-4">
                      {renderObservation(displayedSpaces[0], true)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Servicios:</strong>{" "}
                      {displayedSpaces[0].serveis &&
                      displayedSpaces[0].serveis.length > 0
                        ? displayedSpaces[0].serveis
                            .map(
                              (service) =>
                                service.description_ES || service.name
                            )
                            .join(", ")
                        : "N/A"}
                    </p>

                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Modalidades:</strong>{" "}
                      {displayedSpaces[0].modalitats.length > 0
                        ? displayedSpaces[0].modalitats
                            .map((mod) => mod.name)
                            .join(", ")
                        : "N/A"}
                    </p>

                    {renderScoreWithStar(
                      displayedSpaces[0].totalScore || 0,
                      displayedSpaces[0].comentaris.length || 0
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-20">
                {displayedSpaces.slice(1).map((space) => (
                  <div
                    key={space.id}
                    className="bg-white rounded shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleSpaceClick(space.id)}
                  >
                    <h3 className="text-lg font-bold text-gray-700 mb-4">
                      {space.name}
                    </h3>
                    <img
                      src={space.image}
                      alt="Imagen del espacio"
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                    <p className="text-gray-500 text-sm mb-4">
                      {renderObservation(space, false)}
                    </p>
                    <p className="text-gray-600 text-sm ">
                      <strong>Servicios:</strong>{" "}
                      {space.serveis && space.serveis.length > 0
                        ? space.serveis
                            .map(
                              (service) =>
                                service.description_ES || service.name
                            )
                            .join(", ")
                        : "N/A"}
                    </p>

                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Modalidades:</strong>{" "}
                      {space.modalitats.length > 0
                        ? space.modalitats.map((mod) => mod.name).join(", ")
                        : "N/A"}
                    </p>
                    {renderScoreWithStar(
                      space.totalScore || 0,
                      space.comentaris.length || 0
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center mt-6 space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <p className="text-gray-600 m-0">
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
      <AllComments />
    </div>
  );
};

export default Spaces;
/*
fetch del json de o,agenes de los espacios

const fetchSpaceImages = async () => {
    try {
      const response = await axios.get(
        "http://
      );
      console.log("Imágenes de espacios:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener las imágenes de los espacios:", error);
      return [];
    }
      

const spacesWithImages = filteredSpaces.map((space) => {
        const matchingImage = spaceImages.find(
          (img) => img.registre === space.regNumber
        );
        return {
          ...space,
          image: matchingImage ? matchingImage.image : "/default-image.jpg", // Imagen por defecto si no se encuentra
        };
      });

      setSpaces(spacesWithImages);
      setTotalPages(Math.ceil(spacesWithImages.length / 4));
      setCurrentPage(1);
    } catch (error) {
      console.error("Error al obtener los espacios:", error);
    } finally {
      setLoading(false);
    }
  };

*/
