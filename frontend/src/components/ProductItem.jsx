import { Badge, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const ProductItem = ({
  id,
  nombre,
  descripcion,
  precio,
  stock,
  categoria,
  marca,
  imageUrl,
  oferta,
}) => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const irAlDetalle = () => {
    navigate(`/producto/${id}`);
  };

  const agregarAlCarrito = (e) => {
    e.stopPropagation();

    const producto = {
      id,
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      marca,
      imageUrl,
      oferta,
    };

    const agregado = addToCart(producto, 1);

    if (agregado) {
      openCart();
    }
  };

  return (
    <Card
      className="product-card h-100 shadow-sm"
      onClick={irAlDetalle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          irAlDetalle();
        }
      }}
    >
      {oferta && <span className="offer-badge">OFERTA</span>}

      <Card.Img
        variant="top"
        src={imageUrl || "https://picsum.photos/300/200"}
        className="product-img"
        alt={nombre}
      />

      <Card.Body>
        <Badge bg="info" className="mb-2">
          {categoria}
        </Badge>
        <small className="product-brand">{marca}</small>

        <Card.Title>{nombre}</Card.Title>
        <Card.Text className="product-card-description">
          {descripcion}
        </Card.Text>

        <h4 className="text-success">${precio}</h4>

        <p>{stock} en stock</p>

        <div className="product-actions">
          <Button
            type="button"
            className="btn btn-dark product-detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              irAlDetalle();
            }}
          >
            Ver detalle
          </Button>

          <Button
            type="button"
            className="cart-button"
            onClick={agregarAlCarrito}
            disabled={Number(stock) <= 0}
          >
            🛒 Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
