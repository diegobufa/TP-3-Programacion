import { BASE_URL } from "../constants/productConstants";

const normalizarUsuario = (datosUsuario) => ({
  nombre: datosUsuario.nombre?.trim() || "",
  apellido: datosUsuario.apellido?.trim() || "",
  usuario: datosUsuario.usuario?.trim() || "",
  telefono: datosUsuario.telefono?.trim() || "",
  email: datosUsuario.email?.trim().toLowerCase() || "",
  password: datosUsuario.password || "",
  provincia: datosUsuario.provincia?.trim() || "",
  localidad: datosUsuario.localidad?.trim() || "",
  calle: datosUsuario.calle?.trim() || "",
  altura: datosUsuario.altura?.trim() || "",
  piso: datosUsuario.piso?.trim() || "",
  departamento: datosUsuario.departamento?.trim() || "",
});

const leerRespuesta = async (res, mensajeError) => {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || mensajeError);
  }

  return data;
};

export const authService = {
  registro: async (datosUsuario) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizarUsuario(datosUsuario)),
    });

    return leerRespuesta(res, "Error al registrar usuario");
  },

  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });

    return leerRespuesta(res, "Credenciales incorrectas");
  },

  obtenerUsuarioPorId: async (id) => {
    const res = await fetch(`${BASE_URL}/auth/me/${id}`);

    return leerRespuesta(res, "No se pudieron obtener los datos del usuario");
  },

  getUsuarios: async (token) => {
    const res = await fetch(`${BASE_URL}/usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error("No tienes los permisos de Administrador necesarios.");
      }
      throw new Error(`Error del servidor (Código ${res.status})`);
    }

    return res.json();
  },

  actualizarRol: async (id, fk_rol, token) => {
    const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fk_rol }),
    });

    return leerRespuesta(res, "No se pudo actualizar el rol");
  },

  eliminarUsuario: async (id, token) => {
    const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("No se pudo eliminar");
  },
};
