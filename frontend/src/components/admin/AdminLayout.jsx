import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSidebar";
import AdminTopBar from "./AdminTopbar";

const AdminLayout = () => {

    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    return (
        <div className="admin-layout">
            <AdminSideBar abierto={sidebarAbierto} onCerrar={() => setSidebarAbierto(false)} />
            <main className="admin-main">
                <AdminTopBar titulo="Panel Admin" onToggleSidebar={() => setSidebarAbierto(!sidebarAbierto)} sidebarAbierto={sidebarAbierto} />
                <section className="admin-content">
                    <Outlet/>
                </section>
            </main>
        </div>
    );
};

export default AdminLayout;