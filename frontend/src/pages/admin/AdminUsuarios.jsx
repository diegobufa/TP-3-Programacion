import { useState } from "react";
import { getUsuarios } from "../../services/usuariosApi"
import UsuariosToolbar from "../../components/adminUsuarios/UsuariosToolbar";
import UsuariosTable from "../../components/adminUsuarios/UsuariosTable";

export const USUARIOS_MOCK = [
    { id: 1, nombre: "Juan", apellido: "Pérez", usuario: "juanp", email: "juan@gmail.com", telefono: "3414001234", provincia: "Santa Fe", localidad: "Rosario", calle: "Av. Pellegrini", altura: "1234", piso: "2", departamento: "A", fk_rol: 1 },
    { id: 2, nombre: "María", apellido: "García", usuario: "mariag", email: "maria@gmail.com", telefono: "3414005678", provincia: "Córdoba", localidad: "Córdoba", calle: "San Martín", altura: "456", piso: "", departamento: "", fk_rol: 2 },
    { id: 3, nombre: "Carlos", apellido: "López", usuario: "carlosl", email: "carlos@gmail.com", telefono: "3414009012", provincia: "Buenos Aires", localidad: "La Plata", calle: "Belgrano", altura: "789", piso: "1", departamento: "B", fk_rol: 3 },
    { id: 4, nombre: "Ana", apellido: "Martínez", usuario: "anam", email: "ana@gmail.com", telefono: "3414003456", provincia: "Mendoza", localidad: "Mendoza", calle: "Rivadavia", altura: "321", piso: "", departamento: "", fk_rol: 1 },
    { id: 5, nombre: "Pedro", apellido: "Rodríguez", usuario: "pedror", email: "pedro@gmail.com", telefono: "3414007890", provincia: "Santa Fe", localidad: "Rosario", calle: "Mitre", altura: "654", piso: "3", departamento: "C", fk_rol: 2 },
];

const ROLES = { 1: "Cliente", 2: "Admin", 3: "SysAdmin" };

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState(USUARIOS_MOCK);
    const [busqueda, setBusqueda] = useState("");
    const [rolFiltro, setRolFiltro] = useState("todos");

    const cambiarRol = (id, nuevoRol) => {
        setUsuarios(prev => prev.map(u => u.id === id ? { ...u, fk_rol: parseInt(nuevoRol) } : u));
    };

    const filtrados = usuarios.filter(u => {
        const okRol = rolFiltro === "todos" || u.fk_rol === parseInt(rolFiltro);
        const texto = busqueda.toLowerCase();
        const okBusqueda = u.nombre.toLowerCase().includes(texto) ||
            u.apellido.toLowerCase().includes(texto) ||
            u.email.toLowerCase().includes(texto) ||
            u.usuario.toLowerCase().includes(texto);
        
            return okRol && okBusqueda;
    });

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Usuarios</h4>
            </div>
            <UsuariosToolbar 
                busqueda={busqueda} 
                setBusqueda={setBusqueda} 
                rolFiltro={rolFiltro} 
                setRolFiltro={setRolFiltro} 
            />
            <UsuariosTable 
                filtrados={filtrados} 
                usuarios={usuarios} 
                roles={ROLES} 
                cambiarRol={cambiarRol} 
            />
        </>
    );
};

export default AdminUsuarios;