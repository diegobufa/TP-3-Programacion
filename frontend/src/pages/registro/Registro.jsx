import { useState } from 'react';
import { authService } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registro de Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <h3>Datos Personales</h3>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required style={{ width: '45%', marginRight: '5%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required style={{ width: '45%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="usuario" placeholder="Nombre de Usuario" onChange={handleChange} required style={{ width: '45%', marginRight: '5%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} style={{ width: '45%', marginBottom: '10px', padding: '8px' }} />
        
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ width: '95%', marginBottom: '10px', padding: '8px' }} />
        <input type="password" name="password" placeholder="Contraseña (mín. 6 caracteres)" onChange={handleChange} required style={{ width: '95%', marginBottom: '20px', padding: '8px' }} />

        <h3>Dirección</h3>
        <input type="text" name="provincia" placeholder="Provincia" onChange={handleChange} style={{ width: '45%', marginRight: '5%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="localidad" placeholder="Localidad" onChange={handleChange} style={{ width: '45%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="calle" placeholder="Calle" onChange={handleChange} style={{ width: '45%', marginRight: '5%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="altura" placeholder="Altura" onChange={handleChange} style={{ width: '45%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="piso" placeholder="Piso" onChange={handleChange} style={{ width: '45%', marginRight: '5%', marginBottom: '10px', padding: '8px' }} />
        <input type="text" name="departamento" placeholder="Dpto" onChange={handleChange} style={{ width: '45%', marginBottom: '10px', padding: '8px' }} />

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', marginTop: '15px' }}>Registrarse</button>
      </form>
    </div>
  );
}