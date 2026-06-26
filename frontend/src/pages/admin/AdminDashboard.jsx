import { useEffect, useState } from "react";
import { PEDIDOS_MOCK } from "./AdminPedidos";
import MetricasGrid from "../../components/adminDashboard/DashboardMetricasGrid";
import UltimosPedidos from "../../components/adminDashboard/DashboardPedidosTable";
import UltimosProductos from "../../components/adminDashboard/DashboardProductosTable";

const AdminDashboard = () => {
  const [pedidos] = useState(PEDIDOS_MOCK);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    /*
    fetch(`${API}/pedidos`)
        .then(r => r.json())
        .then(d => setPedidos(Array.isArray(d) ? d : []))
        .catch(() => {});
    */
    fetch("http://localhost:3000/products")
      .then(r => r.json())
      .then(d => setProductos(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  return (
    <>
      <h4 className="fw-bold mb-4">Dashboard</h4>
      <MetricasGrid 
        pedidos={pedidos} 
        productos={productos} 
      />
      <UltimosPedidos 
        pedidos={pedidos} 
      />
      <UltimosProductos 
        productos={productos} 
      />
    </>
  );
};

export default AdminDashboard;