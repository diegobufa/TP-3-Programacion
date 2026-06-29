import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { authService } from '../../services/authServices';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) return setError('Todos los campos son obligatorios.');
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Formato de email inválido.');

    try {
      const token = await authService.login(email, password);
      loginUser(token);
      alert('Sesión iniciada con éxito');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-layout" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="admin-card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Volver al Inicio
          </Link>
        </div>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '700' }}>
          Electro<span style={{ color: 'var(--primary-color, #007bff)' }}>Fest</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Inicia sesión para continuar al sistema
        </p>
        
        {error && (
          <div className="error-message" style={{ padding: '0.8rem', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: 'var(--border-radius)', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid #f5c6cb' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Correo Electrónico</label>
            <input type="email" placeholder="ejemplo@correo.com" value={email} onChange={e => setEmail(e.target.value)} className="form-control" style={{ width: '100%' }} />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Contraseña</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="form-control" style={{ width: '100%' }} />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontWeight: '600' }}>
            Ingresar
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          ¿No tienes cuenta? <Link to="/registro" style={{ color: 'var(--primary-color, #007bff)', fontWeight: '600', textDecoration: 'none' }}>Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}