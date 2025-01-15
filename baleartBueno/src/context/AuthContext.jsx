import { createContext, useContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
  
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser)); // Parsear el usuario almacenado
      }
    };
  
    restoreSession();
  }, []);
  const login = (userData, token) => {
    localStorage.setItem("token", token); // Guarda el token directamente
  localStorage.setItem("user", JSON.stringify(userData)); // Serializa el usuario como JSON
  setToken(token);
  setUser(userData);
  };

  const logout = () => {
    redirect("/"); // Redirige al usuario a la página principal
    localStorage.removeItem("user"); // Elimina la información del usuario almacenada
    setUser(null); // Actualiza el estado del usuario en el contexto
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
