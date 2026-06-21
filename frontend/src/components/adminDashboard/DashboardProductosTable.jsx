import { useNavigate } from "react-router-dom";
import ProductTable from "../adminProducts/ProductTable";

const UltimosProductos = ({ productos }) => {
  const navigate = useNavigate();
  return (
    <div className="admin-table-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong style={{ fontSize: 16, fontWeight: 800 }}>Últimos productos</strong>
        <button className="new-product-btn px-3" style={{ height: 36 }} onClick={() => navigate("/admin/productos")}>Ver más</button>
      </div>
      <ProductTable
        productosFiltrados={productos.slice(-5).reverse()}
        productos={productos}
        editarProducto={() => {}}
        eliminarProducto={() => {}}
      />
    </div>
  );
};

export default UltimosProductos;