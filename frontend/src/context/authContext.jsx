import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const buildUserFromToken = (token) => {
  const decoded = jwtDecode(token);

  return {
    token,
    id: decoded.id,
    email: decoded.email,
    fk_rol: decoded.fk_rol,
    usuario: decoded.usuario,
    nombre: decoded.nombre ?? '',
    apellido: decoded.apellido ?? '',
    telefono: decoded.telefono ?? '',
    provincia: decoded.provincia ?? '',
    localidad: decoded.localidad ?? '',
    calle: decoded.calle ?? '',
    altura: decoded.altura ?? '',
    piso: decoded.piso ?? '',
    departamento: decoded.departamento ?? '',
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        setUser(buildUserFromToken(storedToken));
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (token) => {
    try {
      const userData = buildUserFromToken(token);
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