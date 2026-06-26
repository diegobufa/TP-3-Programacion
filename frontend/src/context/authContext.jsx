import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser({
          token: storedToken,
          email: decoded.email,
          fk_rol: decoded.fk_rol
        });
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      const userData = {
        token,
        email: decoded.email,
        fk_rol: decoded.fk_rol
      };
      setUser(userData);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error("Token inválido recibido del backend", error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};