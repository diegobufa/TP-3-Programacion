import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductTable from "../adminProducts/ProductTable";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal/ConfirmDeleteModal";
import ProductDetailAdminModal from "../../ui/ProductDetailAdminModal/ProductDetailAdminModal";
import { deleteProduct } from "../../services/productApi";

const UltimosProductos = ({ productos, onProductosActualizados }) => {
  const navigate = useNavigate();
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const abrirDetalleProducto = (producto) => {
    setProductoDetalle(producto);
  };

  const cerrarDetalleProducto = () => {
    setProductoDetalle(null);
  };

  const abrirModalEliminar = (producto) => {
    setProductoAEliminar(producto);
  };

  const cerrarModalEliminar = () => {
    if (eliminando) return;
    setProductoAEliminar(null);
  };

  const confirmarEliminarProducto = async () => {
    if (!productoAEliminar) return;

    setEliminando(true);

    try {
      await deleteProduct(productoAEliminar.id);
      await onProductosActualizados?.();
      toast.success("Producto eliminado correctamente");
      setProductoAEliminar(null);
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el producto");
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div className="admin-table-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong style={{ fontSize: 16, fontWeight: 800 }}>
          Últimos productos
        </strong>

        <button
          type="button"
          className="new-product-btn px-3"
          style={{ height: 36 }}
          onClick={() => navigate("/admin/productos")}
        >
          Ver más
        </button>
      </div>

      <ProductTable
        productosFiltrados={productos.slice(-5).reverse()}
        productos={productos}
        verDetalleProducto={abrirDetalleProducto}
        editarProducto={() => {}}
        eliminarProducto={abrirModalEliminar}
      />

      <ProductDetailAdminModal
        producto={productoDetalle}
        cerrarModal={cerrarDetalleProducto}
      />

      <ConfirmDeleteModal
        producto={productoAEliminar}
        cerrarModal={cerrarModalEliminar}
        confirmarEliminar={confirmarEliminarProducto}
        eliminando={eliminando}
      />
    </div>
  );
};

export default UltimosProductos;
