import { createContext, useContext, useEffect, useState } from "react";
import { PEDIDOS_MOCK } from "../data/pedidosMock";

const AdminOrdersContext = createContext(null);
const STORAGE_KEY = "admin_pedidos";

const obtenerPedidosIniciales = () => {
  try {
    const pedidosGuardados = localStorage.getItem(STORAGE_KEY);
    const pedidosParseados = JSON.parse(pedidosGuardados);

    if (Array.isArray(pedidosParseados)) {
      return pedidosParseados;
    }
  } catch {
    // Si localStorage falla, usamos los datos mock.
  }

  return PEDIDOS_MOCK;
};

export const AdminOrdersProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(obtenerPedidosIniciales);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
  }, [pedidos]);

  const actualizarEstadosPedidos = (cambiosEstado) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) => {
        const nuevoEstado = cambiosEstado[pedido.id];

        return nuevoEstado ? { ...pedido, estado: nuevoEstado } : pedido;
      })
    );
  };

  return (
    <AdminOrdersContext.Provider value={{ pedidos, actualizarEstadosPedidos }}>
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
