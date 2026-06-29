import {
  FaBoxOpen,
  FaClipboardList,
  FaTags,
  FaUsers
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const getLinkClass = ({ isActive }) =>  "admin-menu-link" + (isActive ? " active" : "")

const AdminSidebar = ({ abierto, onCerrar }) => {
  const { user } = useContext(AuthContext);
  return (
  <>
    {abierto && (
      <div 
        onClick={onCerrar} 
        style={{
          position: "fixed", inset: 0,
          zIndex:999
        }}
      />
    )}
    <aside className={`admin-sidebar admin-sidebar-drawer ${abierto ? "admin-sidebar-open" : ""}`}>
      <div className="admin-logo"><h2>ElectroFest</h2></div>
      <Link
        to="/"
        state={{
          categoriaSeleccionada: "Catalogo",
          mostrarTodos: false,
          busqueda: "",
        }}
        className="logo-link"
      >
        <h3>ElectroFest</h3>
      </Link>

      <div className="admin-user">
        <div className="admin-avatar">A</div>

        <div>
          <h4>Admin</h4>
          <p>Administrador</p>
        </div>
      </div>

      <nav className="admin-menu">
        <NavLink to="/admin/dashboard" className={getLinkClass} onClick={onCerrar} >
          <FaBoxOpen /> Dashboard
        </NavLink>

        <NavLink to="/admin/productos" className={getLinkClass} onClick={onCerrar} >
          <FaTags /> Productos
        </NavLink>

        <NavLink to="/admin/pedidos" className={getLinkClass} onClick={onCerrar} >
          <FaClipboardList /> Pedidos
        </NavLink>

        {user && Number(user.fk_rol) === 3 && (
  <NavLink to="/admin/usuarios" className={getLinkClass} onClick={onCerrar}>
    <FaUsers /> Usuarios y Roles
  </NavLink>
)}
        {/*
        <NavLink to="/admin/config" className={getLinkClass} onClick={onCerrar} >
          <FaCog /> Configuración
        </NavLink>
        */}
      </nav>
    </aside>
  </>
  );
};

export default AdminSidebar;