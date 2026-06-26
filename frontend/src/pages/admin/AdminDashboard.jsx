import { useCallback, useEffect, useState } from "react";
import { useAdminOrders } from "../../context/AdminOrdersContext.jsx";
import MetricasGrid from "../../components/adminDashboard/DashboardMetricasGrid";
import UltimosPedidos from "../../components/adminDashboard/DashboardPedidosTable";
import UltimosProductos from "../../components/adminDashboard/DashboardProductosTable";

const AdminDashboard = () => {
  const { pedidos } = useAdminOrders();
  const [productos, setProductos] = useState([]);

  const obtenerProductos = useCallback(async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/products");
      const data = await respuesta.json();
      setProductos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error al obtener productos:", error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    obtenerProductos();
  }, [obtenerProductos]);

  return (
    <>
      <h4 className="fw-bold mb-4">Dashboard</h4>
      <MetricasGrid pedidos={pedidos} productos={productos} />
      <UltimosPedidos pedidos={pedidos} />
      <UltimosProductos productos={productos} onProductosActualizados={obtenerProductos} />
    </>
  );
};

export default AdminDashboard;
