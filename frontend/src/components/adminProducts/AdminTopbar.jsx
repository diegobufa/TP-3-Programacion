import { FaBars } from "react-icons/fa";

const AdminTopbar = () => {
  return (
    <header className="admin-topbar">
      <div className="admin-title">
        <FaBars />
        <h2>Productos</h2>
      </div>

      <div className="admin-profile">
        <span>A</span>
        <p>Admin</p>
      </div>
    </header>
  );
};

export default AdminTopbar;