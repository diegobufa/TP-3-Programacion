const CatalogFilters = ({
  categoriasDisponibles,
  marcasDisponibles,
  categoriaFiltroCatalogo,
  setCategoriaFiltroCatalogo,
  marcaSeleccionada,
  setMarcaSeleccionada,
  precioMinimo,
  setPrecioMinimo,
  precioMaximo,
  setPrecioMaximo,
  soloOferta,
  setSoloOferta,
  limpiarFiltros,
}) => {
  return (
    <aside className="catalog-filters">
      <div className="filters-header">
        <div>
          <h4>Filtros</h4>
          <p>Encontrá el producto ideal</p>
        </div>

        <button type="button" onClick={limpiarFiltros}>
          Limpiar
        </button>
      </div>

      <div className="filter-group">
        <h5>Promociones</h5>

        <button
          type="button"
          className={soloOferta ? "offer-filter active" : "offer-filter"}
          onClick={() => setSoloOferta(!soloOferta)}
        >
          🔥 Solo productos en oferta
        </button>
      </div>

      <div className="filter-group">
        <h5>Categoría</h5>

        <select
          value={categoriaFiltroCatalogo}
          onChange={(e) => setCategoriaFiltroCatalogo(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>

          {categoriasDisponibles.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <h5>Marca</h5>

        <select
          value={marcaSeleccionada}
          onChange={(e) => setMarcaSeleccionada(e.target.value)}
        >
          <option value="Todas">Todas las marcas</option>

          {marcasDisponibles.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>

        {marcasDisponibles.length === 0 && (
          <p className="filter-empty">Todavía no hay marcas cargadas.</p>
        )}
      </div>

      <div className="filter-group">
        <h5>Rango de precio</h5>

        <div className="price-filter-row">
          <div>
            <label>Desde</label>
            <input
              type="number"
              value={precioMinimo}
              onChange={(e) => setPrecioMinimo(e.target.value)}
              placeholder="$ mínimo"
            />
          </div>

          <div>
            <label>Hasta</label>
            <input
              type="number"
              value={precioMaximo}
              onChange={(e) => setPrecioMaximo(e.target.value)}
              placeholder="$ máximo"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CatalogFilters;