import { useCallback, useContext, useEffect, useState } from "react";
import { useAdminOrders } from "../../context/AdminOrdersContext.jsx";
import { AuthContext } from "../../context/authContext";
import { authService } from "../../services/authServices";
import MetricasGrid from "../../components/adminDashboard/DashboardMetricasGrid";
import UltimosPedidos from "../../components/adminDashboard/DashboardPedidosTable";
import UltimosProductos from "../../components/adminDashboard/DashboardProductosTable";

const AdminDashboard = () => {
  const { pedidos } = useAdminOrders();
  const { user } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const obtenerProductos = useCallback(async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/products");
      const data = await respuesta.json();
      setProductos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error al obtener productos:", error);
    }
  }, []);

  const obtenerUsuarios = useCallback(async () => {
    if (!user?.token) {
      setUsuarios([]);
      return;
    }

    try {
      const data = await authService.getUsuarios(user.token);
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error al obtener usuarios:", error);
      setUsuarios([]);
    }
  }, [user?.token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    obtenerProductos();
  }, [obtenerProductos]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    obtenerUsuarios();
  }, [obtenerUsuarios]);

  return (
    <>
      <h4 className="fw-bold mb-4">Dashboard</h4>
      <MetricasGrid pedidos={pedidos} productos={productos} usuarios={usuarios.length} />
      <UltimosPedidos pedidos={pedidos} />
      <UltimosProductos productos={productos} onProductosActualizados={obtenerProductos} />
    </>
  );
};

export default AdminDashboard;
