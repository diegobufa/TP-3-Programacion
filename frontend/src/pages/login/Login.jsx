import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { authService } from '../../services/authServices';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados falsos para cumplir con los requerimientos estáticos del Header
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [, setBusqueda] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) return setError('Todos los campos son obligatorios.');
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Formato de email inválido.');

    setLoading(true);
    try {
      const token = await authService.login(email, password);
      loginUser(token);
      alert('Sesión iniciada con éxito');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  <Header
    textoBusqueda={textoBusqueda}
    setTextoBusqueda={setTextoBusqueda}
    setBusqueda={setBusqueda}
  />

  <main className="register-page" style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
    <div className="auth-checkout-card">
      <h2>Iniciar Sesión</h2>
      <p className="subtitle">Completa tus datos para continuar en ElectroFest</p>
    
      <form className="register-form" onSubmit={handleSubmit}>

          {error && <p className="error" style={{ textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button type="submit" className="checkout-secondary-btn" style={{ width: '100%', marginTop: '20px' }}>
            Ingresar
          </button>

          <p className="subtitle" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            ¿No tienes cuenta? <Link to="/registro" style={{ color: 'var(--primary-color, #007bff)', fontWeight: 'bold' }}>Regístrate aquí</Link>
          </p>
      </form>
    </div>
  </main>

  <Footer />
    </>
  );
}