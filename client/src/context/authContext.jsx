import React, { useState, useContext, useEffect } from "react";
import axios from "src/services/axiosInstance";

export const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 1. Відновлення сесії при перезавантаженні сторінки
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Встановлюємо токен для майбутніх запитів
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Error parsing user from local storage", error);
      }
    }
  }, []);

  // 2. Функція входу (викликати її після успішного запиту на сервер)
  const login = (token, userData) => {
    // Зберігаємо "чистий" об'єкт користувача (без зайвої вкладеності)
    setUser(userData);
    
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // 3. Функція виходу
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

