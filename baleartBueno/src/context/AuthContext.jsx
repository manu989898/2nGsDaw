import { createContext, useContext, useState, useEffect } from "react";

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
    console.log("Restaurando sesión con token", token);
    restoreSession();
  }, []);
  const login = (userData, token) => {
    localStorage.setItem("token", token); // Guarda el token directamente
  localStorage.setItem("user", JSON.stringify(userData)); // Serializa el usuario como JSON
  setToken(token);
  setUser(userData);
  alert("Eliminando System 32 📂");
  };

  const logout = () => {
    localStorage.removeItem("user"); // Elimina la información del usuario almacenada
    setUser(null); // Actualiza el estado del usuario en el contexto
    //quiero recargar la pagina
    window.location.reload();// resetear la página apra que se muestre el login y no se qeude en la página de perfil
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
