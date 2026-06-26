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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>

      <div style={{ marginBottom: '15px' }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
          ← Volver al Inicio
        </Link>
      </div>

      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', width: '95%', marginBottom: '10px', padding: '8px' }} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', width: '95%', marginBottom: '10px', padding: '8px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Ingresar</button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        <span>¿No tienes cuenta? </span>
        <Link to="/registro" style={{ color: '#28a745', fontWeight: 'bold', textDecoration: 'none' }}>
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}