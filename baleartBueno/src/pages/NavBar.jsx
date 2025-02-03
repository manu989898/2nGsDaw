import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Configurar el efecto de typewriter para la ruta principal ("/")
  const [textHome] = useTypewriter({
    words: ["¡Descubre la magia de Baleares a través de nuestro portal especializado!"],
    loop: 1, 
    typeSpeed: 50,
  });

  // Configurar el efecto de typewriter para la ruta de perfil ("/profile")
  const [textProfile] = useTypewriter({
    words: ["Aquí podrás modificar tus datos de perfil y ver tus comentarios."],
    loop: 1,
    typeSpeed: 50, 
  });

  // Condicional para determinar el contenido del <h1>
  const renderHeader = () => {
    if (location.pathname === "/") {
      return (
        <h1 className="text-xl font-bold" style={{ whiteSpace: 'nowrap' }}>
          <div style={{ display: "inline-block", minWidth: "700px" }}>
            {textHome}
            <Cursor cursorStyle="|" /> {/* Cursor personalizado */}
          </div>
        </h1>
      );
    } else if (location.pathname === "/profile") {
      return (
        <h1 className="text-xl font-bold" style={{ whiteSpace: 'nowrap' }}>
          <div style={{ margin: "auto", display: "inline-block", minWidth: "700px" }}>
            {textProfile}
            <Cursor cursorStyle="|" /> {/* Cursor personalizado */}
          </div>
        </h1>
      );
    } else {
      return (
        <h1 className="text-xl font-bold" style={{ whiteSpace: 'nowrap' }}>
          Explora los lugares más increíbles de Baleares en BaleArt.
        </h1>
      );
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
      <Link to="/" className="hover:underline">
  <img src="/logo.png" alt="logo" className="w-24 h-16" />
</Link>

        {/* Renderizar el <h1> dinámicamente */}
        {renderHeader()}

        <div className="space-x-4 flex items-center">
          {!user ? (
            <>
              <Link
                to="/auth"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/profile" className="">
                <span className="text-xl">
                  Hola, <span className="hover:underline">{user.name}</span>
                </span>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-white rounded-lg shadow-md bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 transition-all"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;