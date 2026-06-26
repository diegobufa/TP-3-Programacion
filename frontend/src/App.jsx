
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductDetail from "./components/ProductDetail";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminPedidoDetalle from "./pages/admin/AdminPedidoDetalle";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext.jsx";
import { CarritoPage } from "./pages/CarritoPage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage.jsx";
import { MisPedidosPage } from "./pages/MisPedidosPage.jsx";
import { DetallePedidoPage } from "./pages/DetallePedidoPage.jsx";
import { CartSidebar } from "./components/CartSidebar.jsx";

function DetallePedidoWrapper() {
  const { id } = useParams();
  return <DetallePedidoPage orderId={id} />;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartSidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/mis-pedidos" element={<MisPedidosPage />} />
          <Route path="/mis-pedidos/:id" element={<DetallePedidoWrapper />} />
          <Route path="/admin/productos" element={<AdminProducts />} />
          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="pedidos" element={<AdminPedidos />} />
            <Route path="pedidos/:id" element={<AdminPedidoDetalle />} />
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
    </CartProvider>
  );
}

export default App;