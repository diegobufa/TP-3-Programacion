import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import CategoriesNav from "./CategoriesNav";
import Footer from "./Footer";

const ProductDetail = () => {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Catalogo");
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">Cargando producto...</p>;
  }

  if (!producto) {
    return <p className="text-center mt-5">Producto no encontrado</p>;
  }
  const sumarCantidad = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const restarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <>
      <Header
        textoBusqueda={textoBusqueda}
        setTextoBusqueda={setTextoBusqueda}
        setBusqueda={setBusqueda}
      />

      <CategoriesNav
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        setMostrarTodos={setMostrarTodos}
        setBusqueda={setBusqueda}
        setTextoBusqueda={setTextoBusqueda}
      />

      <main className="container-fluid product-detail-page">
        <div className="breadcrumb-detail">
          <Link to="/">Inicio</Link>

          <span> &gt; </span>

          <Link
            to="/"
            state={{
              mostrarTodos: true,
              categoriaSeleccionada: "Catalogo",
            }}
          >
            Catálogo
          </Link>

          <span> &gt; </span>

          <strong>{producto.nombre}</strong>
        </div>
              
        <div className="product-detail-container">
          <section className="detail-gallery">
            <div className="main-product-image">
              <img
                src={producto.imageUrl || "https://picsum.photos/500/400"}
                alt={producto.nombre}
              />
            </div>

            <div className="product-thumbs">
              <img src={producto.imageUrl || "https://picsum.photos/500/400"} alt={producto.nombre}/>
              <img src={producto.imageUrl || "https://picsum.photos/500/400"} alt={producto.nombre} />
              <img src={producto.imageUrl || "https://picsum.photos/500/400"} alt={producto.nombre}/>
              <img src={producto.imageUrl || "https://picsum.photos/500/400"} alt={producto.nombre}/>
            </div>
          </section>

          <section className="detail-info">
            <span className="product-detail-category">
              {producto.categoria}
            </span>

            <h1>{producto.nombre}</h1>

            <p className="product-detail-description">{producto.descripcion}</p>
            
          </section>

          <aside className="detail-buy-card">
            <h2>${producto.precio}</h2>

            <p className={producto.stock > 0 ? "stock-ok" : "stock-error"}>
              ✓ {producto.stock > 0 ? "En stock" : "Sin stock"}
            </p>

            <label>Cantidad</label>

            <div className="quantity-box">
              <button onClick={restarCantidad}>-</button>
              <span>{cantidad}</span>
              <button onClick={sumarCantidad}>+</button>
            </div>

            <button className="add-cart-detail">🛒 Agregar al carrito</button>

            <button className="buy-now-detail">Comprar ahora</button>

            <div className="buy-benefits">
              <div>
                <span>🚚</span>
                <p>
                  <strong>Envío a todo el país</strong>
                  Recibí tu producto en 3 a 7 días hábiles
                </p>
              </div>

              <div>
                <span>🛡️</span>
                <p>
                  <strong>Compra segura</strong>
                  Protegemos tus datos y tu compra
                </p>
              </div>
            </div>

            <Link to="/" className="back-link">
              Volver al catálogo
            </Link>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetail;
