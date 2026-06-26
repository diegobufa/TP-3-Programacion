import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductDetail from "./components/ProductDetail";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminPedidoDetalle from "./pages/admin/AdminPedidoDetalle";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import Login from "./pages/login/Login";
import Registro from "./pages/registro/Registro";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

function App() {
  return (
    <BrowserRouter>
      {/* 🔴 2. ENVOLVEMOS TODO CON EL PROVIDER PARA EVITAR EL ERROR DEL HEADER */}
      <AuthProvider>
        <Routes>
          {/* 💻 RUTAS PÚBLICAS */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          
          {/* 🔴 Nuevas rutas creadas por vos */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* 🛡️ RUTAS PROTEGIDAS PARA EL STAFF (Admin = 2, Superadmin = 3) */}
          <Route element={<ProtectedRoute allowedRoles={[2, 3]} />}>
            <Route path="/admin/productos" element={<AdminProducts />} />
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="pedidos" element={<AdminPedidos />} />
              <Route path="pedidos/:id" element={<AdminPedidoDetalle />} />
              
              {/* 🔴 EXCLUSIVO SUPERADMIN (Rol ID: 3): Tu ABM de gestión de usuarios */}
              <Route 
                path="usuarios" 
                element={
                  <ProtectedRoute allowedRoles={[3]}>
                    <AdminUsuarios />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Route>

          {/* Redirección por si entran a una ruta que no existe */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;