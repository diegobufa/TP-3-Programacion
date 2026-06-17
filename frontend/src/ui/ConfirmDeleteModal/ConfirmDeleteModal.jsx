const ConfirmDeleteModal = ({
  producto,
  cerrarModal,
  confirmarEliminar,
  eliminando,
}) => {
  if (!producto) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h3>Eliminar producto</h3>

        <p>
          ¿Seguro que querés eliminar el producto{" "}
          <strong>{producto.nombre}</strong>?
        </p>

        <span>Esta acción no se puede deshacer.</span>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-modal-btn"
            onClick={cerrarModal}
            disabled={eliminando}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="delete-modal-btn"
            onClick={confirmarEliminar}
            disabled={eliminando}
          >
            {eliminando ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;