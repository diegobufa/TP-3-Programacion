import { ROLES, BADGE_COLOR_ROL } from "../../constants/usuariosContants";

const UsuariosTable = ({ filtrados, usuarios, cambiarRol }) => (
    <div className="admin-table-card">
        <table className="admin-products-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {filtrados.length === 0
                    ? <tr><td colSpan={6} className="empty-products">Sin Resultados</td></tr>
                    : filtrados.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td><strong>{u.nombre} {u.apellido}</strong></td>
                            <td>{u.usuario}</td>
                            <td>{u.email}</td>
                            <td><span className={BADGE_COLOR_ROL[u.fk_rol]}>{ROLES[u.fk_rol]}</span></td>
                            <td>
                                <select 
                                    value={u.fk_rol}
                                    onChange={e => cambiarRol(u.id, e.target.value)}
                                    style={{ height: 36, borderRadius: 8, padding: "0 8px", fontSize: 13, cursor: "pointer", border: "1px solid #e2e8f0", background: "white", color: "#111827" }}
                                >
                                    <option value="1">Cliente</option>
                                    <option value="2">Admin</option>
                                    <option value="3">SysAdmin</option>
                                </select>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <div className="table-footer">
                Mostrando {filtrados.length} de {usuarios.length} usuarios
        </div>
    </div>
);

export default UsuariosTable;