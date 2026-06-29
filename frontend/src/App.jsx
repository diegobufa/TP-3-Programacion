
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductDetail from "./components/ProductDetail";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminPedidoDetalle from "./pages/admin/AdminPedidoDetalle";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext.jsx";
import { AdminOrdersProvider } from "./context/AdminOrdersContext.jsx";
import { CarritoPage } from "./pages/CarritoPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import { MisPedidosPage } from "./pages/MisPedidosPage.jsx";
import { DetallePedidoPage } from "./pages/DetallePedidoPage.jsx";
import { CartSidebar } from "./components/CartSidebar.jsx";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import Login from "./pages/login/Login";
import Registro from "./pages/registro/Registro";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

function DetallePedidoWrapper() {
  const { id } = useParams();
  return <DetallePedidoPage orderId={id} />;
}

function App() {
  return (
    <CartProvider>
      <AdminOrdersProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartSidebar />

        <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<CarritoPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/mis-pedidos" element={<MisPedidosPage />} />
              <Route path="/mis-pedidos/:id" element={<DetallePedidoWrapper />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              <Route element={<ProtectedRoute allowedRoles={[2, 3]} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="pedidos" element={<AdminPedidos />} />
                  <Route path="pedidos/:id" element={<AdminPedidoDetalle />} />
                  <Route path="usuarios" element={<AdminUsuarios />} />
                  <Route path="productos" element={<AdminProducts />} />

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
      </AdminOrdersProvider>
    </CartProvider>
  );
}

export default App;