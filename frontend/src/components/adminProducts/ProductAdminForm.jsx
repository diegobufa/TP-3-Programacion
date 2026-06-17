import { FaTimes } from "react-icons/fa";
import { categorias } from "../../constants/productConstants";

const ProductAdminForm = ({
  form,
  errores,
  editandoId,
  loading,
  handleChange,
  handleSubmit,
  limpiarFormulario,
  cerrarFormulario,
}) => {
  return (
    <form className="product-admin-form" onSubmit={handleSubmit}>
      <div className="form-title-row">
        <div>
          <h3>{editandoId ? "Editar producto" : "Nuevo producto"}</h3>
          <p>Completá los datos del producto</p>
        </div>

        <button
          type="button"
          className="close-form-btn"
          onClick={cerrarFormulario}
        >
          <FaTimes />
        </button>
      </div>

      <div className="form-grid">
        <div className="field">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Heladera Samsung 350L"
          />
          {errores.nombre && <span>{errores.nombre}</span>}
        </div>

        <div className="field">
          <label>Categoría</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          >
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
          {errores.categoria && <span>{errores.categoria}</span>}
        </div>

        <div className="field">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            placeholder="Ej: 250000"
          />
          {errores.precio && <span>{errores.precio}</span>}
        </div>

        <div className="field">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Ej: 12"
          />
          {errores.stock && <span>{errores.stock}</span>}
        </div>

        <div className="field full">
          <label>URL de imagen</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
          {errores.imageUrl && <span>{errores.imageUrl}</span>}
        </div>

        <div className="field full">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción del producto..."
          ></textarea>
          {errores.descripcion && <span>{errores.descripcion}</span>}
        </div>
      </div>

      <div className="checks-row">
        <label>
          <input
            type="checkbox"
            name="disponibilidad"
            checked={form.disponibilidad}
            onChange={handleChange}
          />
          Disponible
        </label>

        <label>
          <input
            type="checkbox"
            name="oferta"
            checked={form.oferta}
            onChange={handleChange}
          />
          Producto en oferta
        </label>
      </div>

      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading
            ? "Guardando..."
            : editandoId
              ? "Actualizar producto"
              : "Guardar producto"}
        </button>

        <button type="button" onClick={limpiarFormulario}>
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default ProductAdminForm;