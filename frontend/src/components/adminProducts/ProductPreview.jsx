import { formatoPrecio } from "../../utils/formatPrice";

const ProductPreview = ({ form }) => {
  return (
    <div className="product-preview-box">
      <h3>Previsualización</h3>
      <p>Así se vería el producto publicado</p>

      <div className="admin-product-preview-card">
        {form.oferta && <span className="preview-offer">OFERTA</span>}

        <img
          src={form.imageUrl || "https://placehold.co/300x220?text=Imagen"}
          alt={form.nombre || "Producto"}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/300x220?text=Imagen";
          }}
        />

        <div className="preview-card-body">
          <span className="preview-category">
            {form.categoria || "Categoría"}
          </span>

          <h4>{form.nombre || "Nombre del producto"}</h4>

          <p>
            {form.descripcion ||
              "La descripción del producto aparecerá en esta zona."}
          </p>

          <h2>{formatoPrecio(form.precio)}</h2>

          <small>
            {form.stock || 0} en stock ·{" "}
            {form.disponibilidad ? "Disponible" : "No disponible"}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;