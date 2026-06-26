import { FaTimes } from "react-icons/fa";
import { formatoPrecio } from "../../utils/formatPrice";

const ProductDetailAdminModal = ({ producto, cerrarModal }) => {
  if (!producto) return null;

  return (
    <div className="modal-overlay" onClick={cerrarModal}>
      <div
        className="product-detail-admin-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="product-detail-admin-close"
          onClick={cerrarModal}
          aria-label="Cerrar detalle del producto"
        >
          <FaTimes />
        </button>

        <div className="product-detail-admin-grid">
          <div className="product-detail-admin-image-box">
            <img
              src={
                producto.imageUrl || "https://placehold.co/400x400?text=Producto"
              }
              alt={producto.nombre}
            />
          </div>

          <div className="product-detail-admin-info">
            <span className="product-detail-admin-tag">
              {producto.categoria || "Sin categoría"}
            </span>

            <h3>{producto.nombre}</h3>

            {producto.marca && producto.marca !== "Sin marca" && (
              <p className="product-detail-admin-brand">{producto.marca}</p>
            )}

            <p className="product-detail-admin-description">
              {producto.descripcion || "Producto sin descripción."}
            </p>

            <div className="product-detail-admin-data">
              <div>
                <small>Precio</small>
                <strong>{formatoPrecio(producto.precio)}</strong>
              </div>

              <div>
                <small>Stock</small>
                <strong>{producto.stock}</strong>
              </div>

              <div>
                <small>Estado</small>
                <strong>
                  {producto.disponibilidad ? "Disponible" : "Oculto"}
                </strong>
              </div>

              <div>
                <small>Oferta</small>
                <strong>{producto.oferta ? "Sí" : "No"}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailAdminModal;
