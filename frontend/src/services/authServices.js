import { BASE_URL } from "../constants/productConstants";

export const authService = {
  
  registro: async (datosUsuario) => {
  const res = await fetch(`${ BASE_URL } /auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosUsuario)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al registrar usuario");
  }

  return res.json();
},

login: async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Credenciales incorrectas");
  }

  const token = await res.json();
  return token;
},

  getUsuarios: async (token) => {
    const res = await fetch(`${API_URL}/usuarios`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("No autorizado");
    return res.json();
  },

  actualizarRol: async (id, fk_rol, token) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ fk_rol })
    });
    return res.json();
  },

  eliminarUsuario: async (id, token) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("No se pudo eliminar");
  }
};