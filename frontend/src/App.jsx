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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/admin/productos" element={<AdminProducts />} />
        <Route path="/admin" element={<AdminLayout/>} >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard/>} />
          <Route path="pedidos" element={<AdminPedidos/>} />
          <Route path="pedidos/:id" element={<AdminPedidoDetalle/>} />
        </Route>
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
    </BrowserRouter>
  );
}

export default App;
