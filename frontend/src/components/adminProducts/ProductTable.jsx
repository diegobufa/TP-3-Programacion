import { FaEdit, FaTrash } from "react-icons/fa";
import { formatoPrecio } from "../../utils/formatPrice";

const ProductTable = ({
  productosFiltrados,
  productos,
  editarProducto,
  eliminarProducto,
}) => {
  return (
    <div className="admin-table-card">
      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id}>
              <td>
                <div className="table-product-info">
                  <img
                    src={
                      producto.imageUrl ||
                      "https://placehold.co/60x60?text=Producto"
                    }
                    alt={producto.nombre}
                  />

                  <div>
                    <strong>{producto.nombre}</strong>
                    {producto.oferta && <small style={{ display: "block", textAlign: "left" }}>Oferta activa</small>}
                  </div>
                </div>
              </td>

              <td>{producto.categoria}</td>

              <td>{formatoPrecio(producto.precio)}</td>

              <td>
                <strong className="stock-number">{producto.stock}</strong>
              </td>

              <td>
                <span
                  className={
                    producto.disponibilidad
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {producto.disponibilidad ? "Disponible" : "Oculto"}
                </span>
              </td>

              <td>
                <div className="table-actions">
                  <button onClick={() => editarProducto(producto)}>
                    <FaEdit />
                  </button>

                  <button onClick={() => eliminarProducto(producto)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {productosFiltrados.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-products">
                No se encontraron productos.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="table-footer">
        Mostrando {productosFiltrados.length} de {productos.length} productos
      </div>
    </div>
  );
};

export default ProductTable;
