import { useState } from 'react';
import { authService } from '../../services/authServices';
import { useNavigate, Link } from 'react-router-dom';

export default function Registro() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', usuario: '', telefono: '', email: '', password: '',
    provincia: '', localidad: '', calle: '', altura: '', piso: '', departamento: '',
    fk_rol: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre || !formData.apellido || !formData.usuario || !formData.email || !formData.password) {
      return setError('Los campos principales son obligatorios.');
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) return setError('Email inválido.');
    if (formData.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');

    try {
      await authService.registro(formData);
      alert('¡Usuario registrado correctamente!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };
  
  const sectionTitleStyle = { margin: '1.5rem 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color, #dee2e6)', paddingBottom: '0.4rem' };
  const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' };

  return (
    <div className="admin-layout" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '2rem' }}>
      <div className="admin-card" style={{ width: '100%', maxWidth: '650px', padding: '2.5rem' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '1rem' }}>← Volver al Inicio</Link>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.25rem' }}>Crear Cuenta</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Únete a la plataforma de ElectroFest</p>

        {error && <div style={{ padding: '0.8rem', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: 'var(--border-radius)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <h4 style={sectionTitleStyle}>Datos Personales</h4>
          <div style={gridStyle}>
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required className="form-control" />
            <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required className="form-control" />
            <input type="text" name="usuario" placeholder="Nombre de Usuario" onChange={handleChange} required className="form-control" />
            <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} className="form-control" />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required className="form-control" style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input type="password" name="password" placeholder="Contraseña (mín. 6 caracteres)" onChange={handleChange} required className="form-control" style={{ width: '100%' }} />
          </div>

          <h4 style={sectionTitleStyle}>Dirección de Envío</h4>
          <div style={gridStyle}>
            <input type="text" name="provincia" placeholder="Provincia" onChange={handleChange} className="form-control" />
            <input type="text" name="localidad" placeholder="Localidad" onChange={handleChange} className="form-control" />
            <input type="text" name="calle" placeholder="Calle" onChange={handleChange} className="form-control" />
            <input type="text" name="altura" placeholder="Altura" onChange={handleChange} className="form-control" />
            <input type="text" name="piso" placeholder="Piso" onChange={handleChange} className="form-control" />
            <input type="text" name="departamento" placeholder="Dpto" onChange={handleChange} className="form-control" />
          </div>

          <button type="submit" className="btn btn-success" style={{ width: '100%', padding: '0.8rem', fontWeight: '600', marginTop: '1.5rem', backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}>
            Registrarse
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--primary-color, #007bff)', fontWeight: '600', textDecoration: 'none' }}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}