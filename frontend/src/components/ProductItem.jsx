import { Badge, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  const irAlDetalle = () => {
    navigate(`/producto/${id}`);
  };

  const agregarAlCarrito = (e) => {
    e.stopPropagation();

    // Acá después va la lógica real del carrito
    console.log("Agregar al carrito:", id);
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

          <Button className="cart-button" onClick={agregarAlCarrito}>
            🛒 Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
