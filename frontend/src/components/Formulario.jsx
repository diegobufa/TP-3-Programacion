import { useState } from "react";

const Formulario = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          return "Debe contener una mayúscula y un número.";
        }
        return "";

      default:
        return "";
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrores((prev) => ({
      ...prev,
      [name]: validarCampo(name, value),
    }));
  };
  const validarFormulario = () => {
    const nuevosErrores = {};

    for (let campo in form) {
      const error = validarCampo(campo, form[campo]);
      if (error) {
        nuevosErrores[campo] = error;
      }
    }
    setErrores(nuevosErrores);
    for (let campo in nuevosErrores) {
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;
    setLoading(true);

    const usuarioParaEnviar = {
      ...form,
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      usuario: form.usuario.trim(),
      email: form.email.trim(),
    };

    try {
      console.log("Usuario válido:", usuarioParaEnviar);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setForm({
        nombre: "",
        apellido: "",
        usuario: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear cuenta </h2>
        <p className="subtitle">Registrate para comprar más rápido</p>
        <div className="field">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </div>
        <div className="field">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          {errores.apellido && <p className="error">{errores.apellido}</p>}
        </div>
        <div className="field">
          <label>Usuario</label>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={form.usuario}
            onChange={handleChange}
            required
          />
          {errores.usuario && <p className="error">{errores.usuario}</p>}
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errores.email && <p className="error">{errores.email}</p>}
        </div>

        <div className="field">
          <label>Password</label>

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
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

          {errores.password && <p className="error">{errores.password}</p>}
        </div>

        <button type="submit" disabled={loading || success}>
          {loading ? "Registrando..." : "Registrar usuario"}
        </button>
        {success && <p className="success">Usuario registrado correctamente</p>}
      </form>
    </div>
  );
};

export default Formulario;
