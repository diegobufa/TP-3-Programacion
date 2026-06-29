import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import CategoriesNav from "./CategoriesNav";
import Footer from "./Footer";
import { useCart } from "../context/CartContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [modalImagenAbierto, setModalImagenAbierto] = useState(false);

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Catalogo");
  const [, setMostrarTodos] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const imagenDefault = data.imageUrl || "https://picsum.photos/500/400";

        setProducto(data);
        setImagenPrincipal(imagenDefault);

        const stockProducto = Number(data.stock) || 0;
        setCantidad(stockProducto > 0 ? 1 : 0);

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

  const stockDisponible = Number(producto.stock) || 0;

  const imagenDefault = producto.imageUrl || "https://picsum.photos/500/400";

  const imagenesAdicionales = Array.isArray(producto.imagenes)
    ? producto.imagenes
    : [];

  const imagenesProducto = [imagenDefault, ...imagenesAdicionales].filter(
    (imagen, index, array) => imagen && array.indexOf(imagen) === index,
  );

  const sumarCantidad = () => {
    setCantidad((cantidadActual) => {
      if (cantidadActual < stockDisponible) {
        return cantidadActual + 1;
      }

      return cantidadActual;
    });
  };

  const restarCantidad = () => {
    setCantidad((cantidadActual) => {
      if (cantidadActual > 1) {
        return cantidadActual - 1;
      }

      return cantidadActual;
    });
  };

  const handleAgregarAlCarrito = () => {
    const agregado = addToCart(producto, cantidad);

    if (agregado) {
      openCart();
    }
  };

  const handleComprarAhora = () => {
    const agregado = addToCart(producto, cantidad);

    if (agregado) {
      navigate("/checkout");
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
        categoriaSeleccionada={categoriaSeleccionada}
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
                src={imagenPrincipal}
                alt={producto.nombre}
                className="clickable-main-image"
                onClick={() => setModalImagenAbierto(true)}
              />
            </div>

            <div className="product-thumbs">
              {imagenesProducto.map((imagen, index) => (
                <button
                  type="button"
                  key={index}
                  className={
                    imagenPrincipal === imagen
                      ? "thumb-btn thumb-active"
                      : "thumb-btn"
                  }
                  onClick={() => setImagenPrincipal(imagen)}
                >
                  <img src={imagen} alt={`${producto.nombre} ${index + 1}`} />
                </button>
              ))}
            </div>
          </section>

          <section className="detail-info">
            <div className="detail-tags">
              <span className="product-detail-category">{producto.categoria}</span>

              {producto.marca && producto.marca !== "Sin marca" && (
                <span className="product-detail-brand">{producto.marca}</span>
              )}
            </div>

            <h1>{producto.nombre}</h1>

            <p className="product-detail-description">{producto.descripcion}</p>
          </section>

          <aside className="detail-buy-card">
            <h2>${producto.precio}</h2>

            <p className={stockDisponible > 0 ? "stock-ok" : "stock-error"}>
              ✓ {stockDisponible > 0 ? "En stock" : "Sin stock"}
            </p>

            <label>Cantidad</label>

            <div className="quantity-box">
              <button
                type="button"
                onClick={restarCantidad}
                disabled={cantidad <= 1 || stockDisponible === 0}
              >
                -
              </button>

              <span>{cantidad}</span>

              <button
                type="button"
                onClick={sumarCantidad}
                disabled={cantidad >= stockDisponible || stockDisponible === 0}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="add-cart-detail"
              disabled={stockDisponible === 0}
              onClick={handleAgregarAlCarrito}
            >
              🛒 Agregar al carrito
            </button>

            <button
              type="button"
              className="buy-now-detail"
              disabled={stockDisponible === 0}
              onClick={handleComprarAhora}
            >
              Comprar ahora
            </button>

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

      {modalImagenAbierto && (
        <div
          className="image-modal-overlay"
          onClick={() => setModalImagenAbierto(false)}
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="image-modal-close"
              onClick={() => setModalImagenAbierto(false)}
            >
              ×
            </button>

            <img src={imagenPrincipal} alt={producto.nombre} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductDetail;
