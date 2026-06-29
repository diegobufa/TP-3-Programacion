import { createContext, useContext, useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../services/orderApi";

const AdminOrdersContext = createContext(null);

export const AdminOrdersProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);

  const obtenerPedidos = async () => {
    try {
      setCargandoPedidos(true);
      const data = await getOrders();
      setPedidos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error al obtener pedidos:", error);
      setPedidos([]);
    } finally {
      setCargandoPedidos(false);
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const actualizarEstadosPedidos = async (cambiosEstado) => {
    const cambios = Object.entries(cambiosEstado);

    if (cambios.length === 0) return;

    await Promise.all(
      cambios.map(([id, estado]) => updateOrderStatus(id, estado))
    );

    await obtenerPedidos();
  };

  return (
    <AdminOrdersContext.Provider
      value={{ pedidos, cargandoPedidos, obtenerPedidos, actualizarEstadosPedidos }}
    >
      {children}
    </AdminOrdersContext.Provider>
  );
};

export const useAdminOrders = () => {
  const context = useContext(AdminOrdersContext);

  if (!context) {
    throw new Error("useAdminOrders debe usarse dentro de AdminOrdersProvider");
  }

  return context;
};
