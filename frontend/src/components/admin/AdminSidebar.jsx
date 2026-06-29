import {
  FaBoxOpen,
  FaClipboardList,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const getLinkClass = ({ isActive }) =>
  "admin-menu-link" + (isActive ? " active" : "");

const AdminSidebar = ({ abierto, onCerrar }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {abierto && <div className="admin-sidebar-backdrop" onClick={onCerrar} />}

      <aside
        className={`admin-sidebar admin-sidebar-drawer ${
          abierto ? "admin-sidebar-open" : ""
        }`}
      >
        <div className="admin-logo">
          <Link
            to="/"
            state={{
              categoriaSeleccionada: "Catalogo",
              mostrarTodos: true,
              busqueda: "",
            }}
            className="admin-logo-link"
            onClick={onCerrar}
          >
            ElectroFest
          </Link>
        </div>

        <div className="admin-user">
          <div className="admin-avatar">A</div>

          <div>
            <h4>Admin</h4>
            <p>Administrador</p>
          </div>
        </div>

        <nav className="admin-menu">
          <NavLink to="/admin/dashboard" className={getLinkClass} onClick={onCerrar}>
            <FaBoxOpen /> Dashboard
          </NavLink>

          <NavLink to="/admin/productos" className={getLinkClass} onClick={onCerrar}>
            <FaTags /> Productos
          </NavLink>

          <NavLink to="/admin/pedidos" className={getLinkClass} onClick={onCerrar}>
            <FaClipboardList /> Pedidos
          </NavLink>

          {Number(user?.fk_rol) === 3 && (
            <NavLink to="/admin/usuarios" className={getLinkClass} onClick={onCerrar}>
              <FaUsers /> Usuarios y Roles
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
