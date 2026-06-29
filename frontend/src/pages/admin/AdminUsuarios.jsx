import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
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
    console.log("Datos del usuario actual en el contexto:", user);
    console.log("Token enviado:", user?.token);

    if (!user?.token) {
      setError("No se detectó un token válido en la sesión.");
      return;
    }

    const data = await authService.getUsuarios(user.token);
    setUsuarios(data);
  } catch (err) { 
    console.error("Error detallado de la petición:", err);
    setError(`Error: ${err.message || 'Error de permisos o conexión al servidor.'}`); 
  }
};

  const handleCambiarRol = async (id, nuevoRolId) => {
    try {
      await authService.actualizarRol(id, parseInt(nuevoRolId), user.token);
      alert('Rol actualizado de manera correcta');
      cargarUsuarios(); 
    } catch (err) { 
      alert('Error al actualizar el rol'); 
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Eliminar este usuario de forma definitiva?')) {
      try {
        await authService.eliminarUsuario(id, user.token);
        cargarUsuarios();
      } catch (err) { 
        alert('No se pudo completar la eliminación.'); 
      }
    }
  };

  const badgeStyle = (rol) => {
    const base = { padding: '5px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', display: 'inline-block' };
    if (rol === 3) return { ...base, backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' }; // Superadmin (Rojo Alerta)
    if (rol === 2) return { ...base, backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #dcfce7' }; // Admin (Verde)
    return { ...base, backgroundColor: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }; // Cliente (Gris Ejecutivo)
  };

return (
  <div className="admin-container" style={{ padding: '24px', background: '#ffffff', borderRadius: '14px', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)', border: '1px solid #e2e8f0' }}>
    <div style={{ marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Gestión de Usuarios y Roles</h2>
      <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0' }}>Panel exclusivo de Superadministración</p>
    </div>

    {error && (
      <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '8px', marginBottom: '20px', fontWeight: '600', fontSize: '14px' }}>
        ⚠️ {error}
      </div>
    )}


    <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #cbd5e1', color: '#475569', fontWeight: '700' }}>
            <th style={{ padding: '12px 8px' }}>Nombre completo</th>
            <th style={{ padding: '12px 8px' }}>Usuario</th>
            <th style={{ padding: '12px 8px' }}>Email</th>
            <th style={{ padding: '12px 8px' }}>Rol Actual</th>
            <th style={{ padding: '12px 8px', textAlign: 'right' }}>Acciones Jerárquicas</th>
          </tr>
        </thead>
        
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#0f172a', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <td style={{ padding: '14px 8px', fontWeight: '500' }}>{u.nombre} {u.apellido}</td>
              <td style={{ padding: '14px 8px', color: '#475569' }}>@{u.usuario}</td>
              <td style={{ padding: '14px 8px', color: '#475569' }}>{u.email}</td>
              <td style={{ padding: '14px 8px' }}>
                <span style={badgeStyle(u.fk_rol)}>
                  {u.fk_rol === 3 ? 'Superadmin' : u.fk_rol === 2 ? 'Admin' : 'Cliente'}
                </span>
              </td>
              <td style={{ padding: '14px 8px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <select 
                    value={u.fk_rol || 1} 
                    onChange={(e) => handleCambiarRol(u.id, e.target.value)} 
                    style={{ 
                      padding: '8px 12px', 
                      borderRadius: '8px', 
                      border: '1px solid #cbd5e1', 
                      background: '#ffffff',
                      color: '#0f172a',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    <option value={1}>Cliente</option>
                    <option value={2}>Admin</option>
                    <option value={3}>Superadmin</option>
                  </select>
                  
                  <button 
                    onClick={() => handleEliminar(u.id)} 
                    style={{ 
                      padding: '8px 14px', 
                      borderRadius: '8px', 
                      border: 'none', 
                      background: '#ef4444', 
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}