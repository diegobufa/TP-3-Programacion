import {
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaTags,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo"></div>

      <div className="admin-user">
        <div className="admin-avatar">A</div>

        <div>
          <h4>Admin</h4>
          <p>Administrador</p>
        </div>
      </div>

      <nav className="admin-menu">
        <button>
          <FaBoxOpen /> Dashboard
        </button>

        <button className="active">
          <FaTags /> Productos
        </button>

        <button>
          <FaClipboardList /> Pedidos
        </button>

        <button>
          <FaUsers /> Clientes
        </button>

        <button>
          <FaCog /> Configuración
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;