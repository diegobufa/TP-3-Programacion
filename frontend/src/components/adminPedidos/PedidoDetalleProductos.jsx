const PedidoDetalleProductos = ({ detalles }) => {
  const total = detalles.reduce((acc, d) => acc + Number(d.precio_subtotal), 0);

  return (
    <div className="admin-table-card">
      <p style={{ fontWeight: 800, marginBottom: 12 }}>Productos del pedido</p>
      <table className="admin-products-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unit.</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d) => {
            const producto = d.producto ?? d.product;
            return (
              <tr key={d.id}>
                <td>
                  <div className="table-product-info">
                    <img
                      src={producto?.imageUrl || "https://placehold.co/48x48?text=?"}
                      alt={producto?.nombre || `Producto ${d.fk_producto}`}
                    />
                    <strong>{producto?.nombre || `#${d.fk_producto}`}</strong>
                  </div>
                </td>
                <td>{d.cantidad}</td>
                <td>${Number(d.precio_uni).toLocaleString("es-AR")}</td>
                <td>
                  <strong style={{ color: "#16a34a" }}>
                    ${Number(d.precio_subtotal).toLocaleString("es-AR")}
                  </strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="table-footer">
        Total: <strong style={{ color: "#16a34a" }}>${total.toLocaleString("es-AR")}</strong>
      </div>
    </div>
  );
};

export default PedidoDetalleProductos;
