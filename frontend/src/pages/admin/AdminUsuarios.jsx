import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await authService.getUsuarios(user.token);
      setUsuarios(data);
    } catch (err) {
      setError('No se pudieron cargar los usuarios. Verifica tus permisos.');
    }
  };

  const handleCambiarRol = async (id, nuevoRolId) => {
    try {
      await authService.actualizarRol(id, parseInt(nuevoRolId), user.token);
      alert('Rol actualizado con éxito');
      cargarUsuarios(); 
    } catch (err) {
      alert('Error al intentar cambiar el rol');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario definitivamente?')) {
      try {
        await authService.eliminarUsuario(id, user.token);
        alert('Usuario eliminado');
        cargarUsuarios();
      } catch (err) {
        alert('No se pudo eliminar el usuario');
      }
    }
  };

  const mostrarNombreRol = (idRol) => {
    if (idRol === 1) return 'Cliente';
    if (idRol === 2) return 'Admin';
    if (idRol === 3) return 'Superadmin';
    return 'Desconocido';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Panel de Control (Superadmin): Gestión Integrada de Usuarios</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>Usuario</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Rol Actual</th>
            <th>Modificar Permisos / Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.usuario}</td>
              <td>{u.nombre} {u.apellido}</td>
              <td>{u.email}</td>
              <td><strong>{mostrarNombreRol(u.fk_rol)}</strong></td>
              <td>
                <select value={u.fk_rol} onChange={(e) => handleCambiarRol(u.id, e.target.value)} style={{ padding: '5px' }}>
                  <option value={1}>Cliente</option>
                  <option value={2}>Admin</option>
                  <option value={3}>Superadmin</option>
                </select>
                
                <button onClick={() => handleEliminar(u.id)} style={{ marginLeft: '15px', padding: '5px 10px', color: 'white', background: '#dc3545', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Eliminar Usuario
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}