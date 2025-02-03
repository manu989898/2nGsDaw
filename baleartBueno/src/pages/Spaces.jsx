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
  const [spaceImages, setSpaceImages] = useState([]); // Lista de imágenes de los espacios
  const [selectedService, setSelectedService] = useState(""); // Servicio seleccionado
  const navigate = useNavigate();

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
    setFiltersVisible(true);
  }, [island, municipality]); // Solo se ejecuta cuando cambian la isla o el municipio
  useEffect(() => {
    const newFilteredSpaces = spaces.filter(
      (space) =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!accessibilityFilter || ["S", "P"].includes(space.accessType)) &&
        (selectedService === "" ||
          space.serveis.some(
            (service) =>
              (service.name || service.description_ES) === selectedService
          )) &&
        (selectedModality === "" ||
          space.modalitats.some((mod) => mod.name === selectedModality))
    );

    setTotalPages(Math.ceil(newFilteredSpaces.length / 6)); // Calcula total de páginas con los espacios filtrados
    setCurrentPage(1); // Reinicia la página actual al aplicar un filtro
  }, [
    spaces,
    searchQuery,
    accessibilityFilter,
    selectedService,
    selectedModality,
  ]);

  // Extraer nombres únicos de servicios
  const allServices = Array.from(
    new Set(
      spaces.flatMap((space) =>
        space.serveis.map((service) => service.name || service.description_ES)
      )
    )
  );
  const serviceIcons = {
    Wifi: "📶",
    Biblioteca: "📚",
    Cafetería: "☕",
    Guia: "📍",
    Estacionamiento: "🚗",
    Restaurante: "🍽️",
    Gimnasio: "🏋️",
    Piscina: "🏊",
    Spa: "💆",
    Parque: "🌳",
    Accesibilidad: "♿",
  };
  const modalityIcons = {
    Pintura: "🎨",
    Escultura: "🗿",
    Fotografía: "📷",
    Video: "📹",
    Performance: "🎭",
    Grafiti: "🖌️",
    Música: "🎵",
  };

  //cambiar el space observacion_XX, djeo añadida la variable isFeatured para que se pueda usar en el futuro para mostrar mas o menos texto segun el post
  const renderObservation = (space, isFeatured) => {
    const truncate = (text, length) => {
      return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const maxLength = isFeatured ? 1280 : 160; //lenght de caracteres a mostrar en la descripcion de los spaces.

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

  //Carga de imagene sy espacios
  const fetchSpaces = async (islandName, municipalityName) => {
    setLoading(true);
    try {
      // Cargar las imágenes primero
      const imageResponse = await axios.get("/spaces.json");
      const loadedImages = imageResponse.data;
      console.log("Imágenes de espacios:", spaceImages);
      {
        /* Lo pongo para que no salte warning por no usar spaceImages */
      }
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
        const scoreA = parseFloat(a.totalScore / a.comentaris.length) || 0;
        const scoreB = parseFloat(b.totalScore / b.comentaris.length) || 0;
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
      setTotalPages(Math.ceil(filteredSpaces.length / 6)); // 6 porque en displayedSpaces usas 6 por página
      setCurrentPage(1);
    } catch (error) {
      console.error("Error al obtener los espacios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    scroll(0, 0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    scroll(0, 0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    scroll(0, 0);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    scroll(0, 0);
  };

  //handle para ir a un espacio detallado al clicar
  const handleSpaceClick = (spaceId) => {
    navigate(`/space/${spaceId}`);
  };

  // Extraer nombres únicos de modalidades
  const allModalities = Array.from(
    new Set(spaces.flatMap((space) => space.modalitats.map((mod) => mod.name)))
  );

  const filteredSpaces = spaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!accessibilityFilter || ["S", "P"].includes(space.accessType)) &&
      (selectedService === "" ||
        space.serveis.some(
          (service) =>
            (service.name || service.description_ES) === selectedService
        )) &&
      (selectedModality === "" ||
        space.modalitats.some((mod) => mod.name === selectedModality))
  );

  const displayedSpaces = filteredSpaces.slice(
    (currentPage - 1) * 6,
    currentPage * 6
  );

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar language={language}  />
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
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="flex items-center gap-4 ">
                  <div className="flex items-center">
                    {/* Label de islas (oculto por estetica)
                    <label
                      htmlFor="island"
                      className="text-lg font-semibold text-gray-700 mr-4"
                    >
                      Isla:
                    </label>
                    */}
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
                      <option value="">{language === "ES" ? "Municipios" : language === "EN" ? "Municipality" : "Municipis"} </option>
                      {municipalities.map((mun) => (
                        <option key={mun} value={mun}>
                          {mun}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <select
                      id="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                      <option value="">{language === "ES" ? "🛠️ Servicios" : language === "EN" ? "🛠️ Services" : "🛠️ Serveïs"} </option>
                      {allServices.map((service) => {
                        const serviceName = service.trim(); // Normalizar el nombre del servicio
                        return (
                          <option key={serviceName} value={serviceName}>
                            {serviceIcons[serviceName] || "❔"} {serviceName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder= {language === "ES" ? "Buscar por nombre..." : language === "EN" ? "Search by name...s" : "Cercar per nom..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="min-w-[200px] flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  />

                  <div className="flex items-center">
                    <select
                      id="modality"
                      value={selectedModality}
                      onChange={(e) => setSelectedModality(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                      <option value="">{language === "ES" ? "🎭 Modalidades" : language === "EN" ? "🎭 Modalities" : "🎭 Modalitats"}</option>
                      {allModalities.map((modality) => {
                        const modName = modality.trim();
                        return (
                          <option key={modName} value={modName}>
                            {modalityIcons[modName] || "❔"} {modName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLanguage("ES")}
                      className={`px-4 py-2 rounded-l bg-gray-300 hover:bg-gray-400 ${
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
                      className={`px-4 py-2 bg-gray-300 hover:bg-gray-400 ${
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
                      className={`px-4 py-2 rounded-r bg-gray-300 hover:bg-gray-400 ${
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

                    <button
                      onClick={() => setAccessibilityFilter((prev) => !prev)}
                      className={`px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all ${
                        accessibilityFilter
                          ? "bg-blue-500 text-white ring-blue-300"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {accessibilityFilter ? "♿ Activado" : "♿ Desactivado"}
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedModality("");
                        setAccessibilityFilter(false);
                        setSelectedService("");
                        setMunicipality("");
                      }}
                      className="px-4 py-2 text-white rounded-lg shadow-md bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 transition-all"
                    >
                      {language === "ES" ? "Eliminar Filtros" : language === "EN" ? "Remove Filters" : "Eliminar Filtres"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Espacios */}
          {loading ? (
            <p className="text-center text-gray-500">Cargando espacios...</p>
          ) : displayedSpaces.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay espacios disponibles.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedSpaces.map((space) => (
                <div
                  key={space.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-10 p-4 cursor-pointer"
                  onClick={() => handleSpaceClick(space.id)}
                >
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-bold text-gray-800">
                    {space.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {renderObservation(space, false)}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong className="font-semibold text-gray-700">
                      {language === "ES"
                        ? "Ubicación"
                        : language === "EN"
                        ? "Location"
                        : "Ubicació"}
                    </strong>{" "}
                    📍 {space.address.municipality.name},{" "}
                    {space.address.municipality.island.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong className="font-semibold text-gray-700">
                      {language === "ES"
                        ? "Servicios"
                        : language === "EN"
                        ? "Services"
                        : "Serveis"}{" "}
                    </strong>{" "}
                    <span>
                      {space.serveis
                        .map(
                          (service) =>
                            `${serviceIcons[service.name] || "❔"} ${
                              service.name || service.description_ES
                            }`
                        )
                        .join(", ") || "N/A"}{" "}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong className="font-semibold text-gray-700">
                      {language === "ES"
                        ? "Modalidades"
                        : language === "EN"
                        ? "Modalities"
                        : "Modalitats"}
                    </strong>{" "}
                    <span>
                      {space.modalitats
                        .map((mod) => {
                          const modName = mod.name.trim();
                          return `${modalityIcons[modName] || "❔"} ${modName}`;
                        })
                        .join(", ") || "N/A"}
                    </span>
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    {/* Contenedor de puntuación y comentarios */}
                    <div className="flex items-center space-x-2">
                      <span className="bg-yellow-200/50 text-black px-3 py-1 rounded font-semibold flex items-center justify-center border-2 border-yellow-500/50 backdrop-blur-md shadow-lg">
                        {space.comentaris.length > 0
                          ? (
                              space.totalScore / space.comentaris.length
                            ).toFixed(1)
                          : 0.0}
                        <span className="ml-1">⭐</span>
                      </span>

                      <span className="bg-green-400/50 text-black px-3 py-1 rounded font-semibold flex items-center justify-center border-2 border-green-500/50 backdrop-blur-md shadow-lg">
                        ({space.comentaris.length}{" "}
                        {space.comentaris.length === 1
                          ? "comentario"
                          : "comentarios"}
                        )
                      </span>
                    </div>

                    <button className="bg-blue-600 text-white px-4 py-2 font-bold rounded hover:bg-blue-700">
                      {language === "ES"
                        ? "Ver más"
                        : language === "EN"
                        ? "See More"
                        : "Veure més"}{" "}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Paginación */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleFirstPage}
              disabled={currentPage === 1}
            >
              {language === "ES"
                ? "Primera"
                : language === "EN"
                ? "First"
                : "Primera"}
            </button>
            <button
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {language === "ES"
                ? "Anterior"
                : language === "EN"
                ? "Previous"
                : "Anterior"}
            </button>
            <span className="text-gray-600">
  {language === "ES"
    ? `Página ${currentPage} de ${totalPages}`
    : language === "EN"
    ? `Page ${currentPage} of ${totalPages}`
    : `Pàgina ${currentPage} de ${totalPages}`}
</span>

            <button
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {language === "ES"
                ? "Siguiente"
                : language === "EN"
                ? "Next"
                : "Següent"}
            </button>
            <button
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              {language === "ES"
                ? "Última"
                : language === "EN"
                ? "Last"
                : "Última"}
            </button>
          </div>
        </div>
      </div>
      <AllComments language={language} />
          </div>
  );
};

export default Spaces;
