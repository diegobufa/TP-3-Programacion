import ProductItem from "./ProductItem";

const FeaturedProducts = ({
  productos,
  mostrarTodos,
  setMostrarTodos,
  mostrarOrdenamiento = false,
  ordenarPor,
  setOrdenarPor,
}) => {
  const productosAMostrar = mostrarTodos ? productos : productos.slice(0, 4);

  return (
    <section className="products-section">
      <div className="products-header">
        <div>
          <h3>
            {mostrarTodos ? "Catálogo de productos" : "Productos destacados"}
          </h3>

          {mostrarTodos && (
            <p className="products-count">
              {productos.length} productos encontrados
            </p>
          )}
        </div>

        <div className="products-header-actions">
          {mostrarOrdenamiento && (
            <div className="sort-box">
              <label>Ordenar por</label>

              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
              >
                <option value="relevancia">Relevancia</option>
                <option value="menorPrecio">Menor precio</option>
                <option value="mayorPrecio">Mayor precio</option>
                <option value="nombre">Nombre A-Z</option>
              </select>
            </div>
          )}

          {!mostrarTodos && (
            <button
              className="view-all-btn"
              onClick={() => setMostrarTodos(true)}
            >
              Ver todos
            </button>
          )}
        </div>
      </div>

      <div className="row">
        {productosAMostrar.map((item) => (
          <div className="col-xl-3 col-lg-4 col-md-6 mb-4" key={item.id}>
            <ProductItem {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;