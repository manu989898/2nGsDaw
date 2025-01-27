import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4 ">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="hover:underline">
          <img src="/logo.png" alt="logo" className="w-24 h-16" />
        </Link>

    
        
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
              <Link
                to="/profile"
                className=""
              >
                
              <span className="text-xl">Hola, {user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
