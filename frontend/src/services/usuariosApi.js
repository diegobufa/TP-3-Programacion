import { USUARIOS_URL } from "../constants/usuariosContants";

export const getUsuarios = async () => {
    const res = await fetch(USUARIOS_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return await res.json();
};

export const updateUsuarioRol = async (id, fk_rol) => {
    const res = await fetch(`${USUARIOS_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fk_rol }),
    });

    if (!res.ok) throw new Error("Error al actualizar rol");
    return await res.json();
};