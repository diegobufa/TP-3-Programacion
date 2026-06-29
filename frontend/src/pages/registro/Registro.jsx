import { useState } from 'react';
import { authService } from '../../services/authServices';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';

export default function Registro() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errores, setErrores] = useState({});

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [, setBusqueda] = useState("");

  const [formData, setFormData] = useState({
    nombre: '', apellido: '', usuario: '', telefono: '', email: '', password: '',
    provincia: '', localidad: '', calle: '', altura: '', piso: '', departamento: '',
    fk_rol: 1
  });

  const validarCampo = (name, value) => {
    switch (name) {
      case "nombre":
      case "apellido":
        if (!value.trim()) return "Este campo es obligatorio.";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          return "Solo se permiten letras.";
        }
        return "";
      case "usuario":
        if (!value.trim()) return "El usuario es obligatorio.";
        if (value.length < 4) return "Debe tener al menos 4 caracteres.";
        return "";
      case "email":
        if (!value.trim()) return "El email es obligatorio.";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email inválido.";
        return "";
      case "password":
        if (!value.trim()) return "La contraseña es obligatoria.";
        if (value.length < 8) return "Debe tener mínimo 8 caracteres.";
        if (!/(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Debe contener al menos una mayúscula y un número.";
        }
        return "";
      default:
        return "";
    }
  };

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (["nombre", "apellido", "usuario", "email", "password"].includes(name)) {
      setErrores((prev) => ({
        ...prev,
        [name]: validarCampo(name, value),
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const camposPrincipales = ["nombre", "apellido", "usuario", "email", "password"];

    camposPrincipales.forEach((campo) => {
      const err = validarCampo(campo, formData[campo]);
      if (err) nuevosErrores[campo] = err;
    });

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validarFormulario()) return;

    setLoading(true);
    try {
      await authService.registro(formData);
      setSuccess(true);
      toast.success('Usuario registrado correctamente');
      setTimeout(() => {
        setSuccess(false);
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'No se pudo registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const sectionDividerStyle = { gridColumn: '1 / -1', margin: '1rem 0 0.5rem', fontSize: '1.1rem', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '5px' };

  return (
    <>
      <Header
        textoBusqueda={textoBusqueda}
        setTextoBusqueda={setTextoBusqueda}
        setBusqueda={setBusqueda}
      />

      <main className="register-page" style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
  <div className="auth-checkout-card">
    <h2>Crear Cuenta</h2>
    <p className="subtitle">Completa tus datos para continuar en ElectroFest</p>

    <form className="register-form" onSubmit={handleSubmit}>

          {error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}
          {success && <p className="success" style={{ textAlign: 'center' }}>Usuario registrado correctamente</p>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 15px', width: '100%' }}>
            
            <h3 style={sectionDividerStyle}>Datos Personales</h3>
            
            <div className="field">
              <label>Nombre</label>
              <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
              {errores.nombre && <p className="error">{errores.nombre}</p>}
            </div>

            <div className="field">
              <label>Apellido</label>
              <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
              {errores.apellido && <p className="error">{errores.apellido}</p>}
            </div>

            <div className="field">
              <label>Usuario</label>
              <input type="text" name="usuario" placeholder="Usuario" value={formData.usuario} onChange={handleChange} required />
              {errores.usuario && <p className="error">{errores.usuario}</p>}
            </div>

            <div className="field">
              <label>Teléfono</label>
              <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
            </div>

            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              {errores.email && <p className="error">{errores.email}</p>}
            </div>

            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              {errores.password && <p className="error">{errores.password}</p>}
            </div>

            <h3 style={sectionDividerStyle}>Dirección de Envío</h3>

            <div className="field">
              <label>Provincia</label>
              <input type="text" name="provincia" placeholder="Provincia" value={formData.provincia} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Localidad</label>
              <input type="text" name="localidad" placeholder="Localidad" value={formData.localidad} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Calle</label>
              <input type="text" name="calle" placeholder="Calle" value={formData.calle} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Altura</label>
              <input type="text" name="altura" placeholder="Altura" value={formData.altura} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Piso</label>
              <input type="text" name="piso" placeholder="Piso" value={formData.piso} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Departamento</label>
              <input type="text" name="departamento" placeholder="Dpto" value={formData.departamento} onChange={handleChange} />
            </div>

          </div>

          <button type="submit" disabled={loading || success} className="checkout-secondary-btn" style={{ width: '100%', marginTop: '20px' }}>
            {loading ? "Registrando..." : "Registrar usuario"}
          </button>
          
          <p className="subtitle" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--primary-color, #007bff)', fontWeight: 'bold' }}>Inicia sesión</Link>
          </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}