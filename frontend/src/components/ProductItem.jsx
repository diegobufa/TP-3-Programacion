import { Badge, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProductItem = ({
  id,
  nombre,
  descripcion,
  precio,
  stock,
  categoria,
  imageUrl,
  oferta,
}) => {
  return (
    <Card className="product-card h-100 shadow-sm">
      {oferta && <span className="offer-badge">OFERTA</span>}

      <Card.Img
        variant="top"
        src={imageUrl || "https://picsum.photos/300/200"}
        className="product-img"
      />

      <Card.Body>
        <Badge bg="info" className="mb-2">
          {categoria}
        </Badge>

        <Card.Title>{nombre}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>

        <h4 className="text-success">${precio}</h4>
        <p>{stock} en stock</p>
        <div className="product-actions">
          <Link
            to={`/producto/${id}`}
            className="btn btn-dark product-detail-btn"
          >
            Ver detalle
          </Link>

          <Button className="cart-button">🛒 Agregar</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
