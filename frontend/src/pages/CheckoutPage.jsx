import { useContext, useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { AuthContext } from "../context/authContext";
import PublicPageLayout from "../components/PublicPageLayout.jsx";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authServices";
import { toast } from "react-toastify";

const obtenerDireccionUsuario = (user) => {
  const calleAltura = [user?.calle, user?.altura].filter(Boolean).join(" ").trim();
  const pisoDpto = [
    user?.piso ? `Piso ${user.piso}` : "",
    user?.departamento ? `Dpto ${user.departamento}` : "",
  ]
    .filter(Boolean)
    .join(" - ");

  return [calleAltura, pisoDpto].filter(Boolean).join(" - ");
};

const mapUsuarioAFormulario = (usuario) => ({
  nombre: `${usuario?.nombre ?? ""} ${usuario?.apellido ?? ""}`.trim(),
  email: usuario?.email ?? "",
  telefono: usuario?.telefono ?? "",
  direccion: obtenerDireccionUsuario(usuario),
  provincia: usuario?.provincia ?? "",
  localidad: usuario?.localidad ?? "",
});

const CheckoutPage = () => {
  const { cart, getTotal, createOrder } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    provincia: "",
    localidad: "",
  });

  const [procesando, setProcesando] = useState(false);
  const [editarDatos, setEditarDatos] = useState(false);

  useEffect(() => {
    if (!user) return;

    let cancelarCarga = false;

    const cargarDatosUsuario = async () => {
      try {
        const usuarioActualizado = user.id
          ? await authService.obtenerUsuarioPorId(user.id)
          : user;

        if (!cancelarCarga) {
          setCustomerData(mapUsuarioAFormulario({ ...user, ...usuarioActualizado }));
        }
      } catch (error) {
        console.warn("No se pudieron cargar los datos completos del usuario", error);

        if (!cancelarCarga) {
          setCustomerData(mapUsuarioAFormulario(user));
        }
      }
    };

    cargarDatosUsuario();

    return () => {
      cancelarCarga = true;
    };
  }, [user]);

  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const validarDatosEnvio = () => {
    if (!customerData.nombre.trim()) return "Falta el nombre completo";
    if (!customerData.email.trim()) return "Falta el correo electrónico";
    if (!customerData.direccion.trim()) return "Falta la dirección de envío";
    if (!customerData.provincia.trim()) return "Falta la provincia";
    if (!customerData.localidad.trim()) return "Falta la localidad";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.warning("Tenés que iniciar sesión para confirmar el pedido");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.warning("El carrito está vacío");
      return;
    }

    const errorDatos = validarDatosEnvio();
    if (errorDatos) {
      toast.warning(`${errorDatos}. Revisá los datos antes de confirmar el pedido.`);
      setEditarDatos(true);
      return;
    }

    try {
      setProcesando(true);

      const pedidoCreado = await createOrder({
        ...customerData,
        fk_usuario: user.id,
      });

      toast.success(`Compra realizada con éxito. Pedido N° ${pedidoCreado.numero_pedido}`);
      navigate("/mis-pedidos");
    } catch (error) {
      toast.error(error.message || "No se pudo confirmar el pedido");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <PublicPageLayout>
      <main className="checkout-page">
        <section className="checkout-card">
          <div className="checkout-header">
            <h2>Finalizar compra</h2>
            <p>Confirmá tus datos de envío para generar el pedido</p>
          </div>

          <div className="checkout-user-box">
            <div>
              <strong>Datos del usuario</strong>
              <p>
                Se cargan automáticamente desde tu cuenta. Podés editarlos solo para este pedido.
              </p>
            </div>

            <button
              type="button"
              className="checkout-secondary-btn"
              onClick={() => setEditarDatos((prev) => !prev)}
            >
              {editarDatos ? "Bloquear edición" : "Editar datos"}
            </button>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre y apellido"
                value={customerData.nombre}
                onChange={handleChange}
                readOnly={!editarDatos}
                required
              />
            </div>

            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="correo@email.com"
                value={customerData.email}
                onChange={handleChange}
                readOnly={!editarDatos}
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono de contacto"
                value={customerData.telefono}
                onChange={handleChange}
                readOnly={!editarDatos}
              />
            </div>

            <div className="form-group">
              <label>Dirección de envío</label>
              <input
                type="text"
                name="direccion"
                placeholder="Calle, altura, piso/departamento"
                value={customerData.direccion}
                onChange={handleChange}
                readOnly={!editarDatos}
                required
              />
            </div>

            <div className="checkout-form-row">
              <div className="form-group">
                <label>Provincia</label>
                <input
                  type="text"
                  name="provincia"
                  placeholder="Provincia"
                  value={customerData.provincia}
                  onChange={handleChange}
                  readOnly={!editarDatos}
                  required
                />
              </div>

              <div className="form-group">
                <label>Localidad</label>
                <input
                  type="text"
                  name="localidad"
                  placeholder="Localidad"
                  value={customerData.localidad}
                  onChange={handleChange}
                  readOnly={!editarDatos}
                  required
                />
              </div>
            </div>

            <div className="checkout-summary">
              <span>Total a pagar</span>
              <strong>${Number(getTotal()).toLocaleString("es-AR")}</strong>
            </div>

            <button type="submit" className="checkout-btn" disabled={procesando}>
              {procesando ? "Procesando..." : "Confirmar y pagar"}
            </button>
          </form>
        </section>
      </main>
    </PublicPageLayout>
  );
};

export default CheckoutPage;
