import { FaBars } from "react-icons/fa";

const AdminTopbar = ({ titulo = "Admin", onToggleSidebar, sidebarAbierto }) => {
  return (
    <header className="admin-topbar">
      <div className="admin-title">
        <FaBars className="admin-hamburguer" style={{ cursor: "pointer" }} onClick={onToggleSidebar} />
        {!sidebarAbierto && <h2>{titulo}</h2>}
      </div>

      <div className="admin-profile">
        <span>A</span>
        <p>Admin</p>
      </div>
    </header>
  );
};

export default AdminTopbar;