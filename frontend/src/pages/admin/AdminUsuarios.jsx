import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { authService } from '../../services/authServices';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  const context = useContext(AuthContext);
  const user = context?.user; 

  useEffect(() => { 
    if (user?.token) {
      cargarUsuarios(); 
    }
  }, [user]);

  const cargarUsuarios = async () => {
    try {
      const data = await authService.getUsuarios(user.token);
      setUsuarios(data);
    } catch (err) { 
      setError('Error de permisos o conexión al servidor.'); 
    }
  };

  const handleCambiarRol = async (id, nuevoRolId) => {
    try {
      await authService.actualizarRol(id, parseInt(nuevoRolId), user.token);
      alert('Rol actualizado de manera correcta');
      cargarUsuarios(); 
    } catch (err) { alert('Error al actualizar el rol'); }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Eliminar este usuario de forma definitiva?')) {
      try {
        await authService.eliminarUsuario(id, user.token);
        cargarUsuarios();
      } catch (err) { alert('No se pudo completar la baja'); }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Gestión de Usuarios y Roles</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Panel de control de roles Superadmin
          </p>
        </div>
      </div>

      {error && <div className="error-message" style={{ padding: '1rem', marginBottom: '1.5rem' }}>{error}</div>}

      <div className="admin-card" style={{ padding: '0', overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Rango Actual</th>
              <th>Modificar / Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td style={{ fontWeight: '600' }}>@{u.usuario}</td>
                <td>{u.nombre} {u.apellido}</td>
                <td>{u.email}</td>
                <td>
                  <span style={getBadgeStyle(u.fk_role || u.fk_rol)}>
                    {(u.fk_role || u.fk_rol) === 3 ? 'Superadmin' : (u.fk_role || u.fk_rol) === 2 ? 'Admin' : 'Cliente'}
                  </span>
                </td>
                <td>
                  <select 
                    value={u.fk_role || u.fk_rol} 
                    onChange={(e) => handleCambiarRol(u.id, e.target.value)} 
                    className="form-control"
                    style={{ width: 'auto', display: 'inline-block', padding: '0.3rem 0.5rem', fontSize: '0.85rem', marginRight: '0.75rem' }}
                  >
                    <option value={1}>Cliente</option>
                    <option value={2}>Admin</option>
                    <option value={3}>Superadmin</option>
                  </select>
                  <button onClick={() => handleEliminar(u.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getBadgeStyle = (rol) => {
  const base = { padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', display: 'inline-block' };
  if (rol === 3) return { ...base, backgroundColor: '#eaedf7', color: '#6571ff' };
  if (rol === 2) return { ...base, backgroundColor: '#e2f6ed', color: '#00b96b' };
  return { ...base, backgroundColor: '#f1f3f5', color: '#495057' };
};