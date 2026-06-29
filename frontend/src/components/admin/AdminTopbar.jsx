import { FaBars, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminTopbar = ({ titulo = "Admin", onToggleSidebar, sidebarAbierto }) => {
  return (
    <header className="admin-topbar">
      <div className="admin-title">
        <FaBars
          className="admin-hamburguer"
          style={{ cursor: "pointer" }}
          onClick={onToggleSidebar}
        />
        {!sidebarAbierto && <h2>{titulo}</h2>}
      </div>

      <div className="admin-topbar-actions">
        <Link
          to="/"
          state={{
            categoriaSeleccionada: "Catalogo",
            mostrarTodos: true,
            busqueda: "",
          }}
          className="admin-home-link"
        >
          <FaHome /> Volver al sitio
        </Link>

        <div className="admin-profile">
          <span>A</span>
          <p>Admin</p>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
