const UsuariosToolbar = ({ busqueda, setBusqueda, rolFiltro, setRolFiltro }) => (
    <div className="admin-actions-bar mb-3" style={{ gridTemplateColumns: "1fr 200px" }}>
        <input placeholder="Buscar usuario" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        <select value={rolFiltro} onChange={e => setRolFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="1">Cliente</option>
            <option value="2">Admin</option>
            <option value="3">SysAdmin</option>
        </select>
    </div>
);

export default UsuariosToolbar;