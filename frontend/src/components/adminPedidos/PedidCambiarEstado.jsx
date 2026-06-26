import { ESTADO_PEDIDO } from "../../constants/pedidosConstants"

const PedidoCambiarEstado = ({ estadoActual, onChange }) => (
  <div className="admin-table-card mb-4">
    <p style={{ fontWeight: 800, marginBottom: 12 }}>Cambiar estado</p>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {ESTADO_PEDIDO.map(e => (
        <button
          key={e}
          onClick={() => onChange(e)}
          className={estadoActual === e ? "new-product-btn px-3" : "clear-admin-filters-btn px-3"}
          style={{ height: 38, textTransform: "capitalize" }}
        >
          {e}
        </button>
      ))}
    </div>
  </div>
);

export default PedidoCambiarEstado;