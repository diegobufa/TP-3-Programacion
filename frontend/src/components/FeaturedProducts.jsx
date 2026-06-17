import ProductItem from "./ProductItem";

const FeaturedProducts = ({ productos, mostrarTodos, setMostrarTodos }) => {
  const productosAMostrar = mostrarTodos ? productos : productos.slice(0, 4);

  return (
    <section className="products-section">
      <div className="products-header">
        <h3>{mostrarTodos ? "Catálogo de productos" : "Productos destacados"}</h3>

        {!mostrarTodos && (
          <button className="view-all-btn" onClick={() => setMostrarTodos(true)}>
            Ver todos
          </button>
        )}
      </div>

      <div className="row">
        {productosAMostrar.map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <ProductItem {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;