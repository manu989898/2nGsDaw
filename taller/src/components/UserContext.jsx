// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create Context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch("http://127.0.0.1:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al autenticar");
        })
        .then((data) => {
          setUser(data.user);  // If token is valid, set the user
        })
        .catch((error) => {
          console.error("Error al obtener usuario:", error);
          localStorage.removeItem("authToken");  // Remove token if error occurs
        });
    } else {
      setUser(null); // If no token, user is not authenticated
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
