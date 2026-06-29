import { useEffect, useState, useRef } from "react";
import AdminProductToolbar from "../../components/adminProducts/AdminProductToolbar";
import ProductAdminForm from "../../components/adminProducts/ProductAdminForm";
import ProductPreview from "../../components/adminProducts/ProductPreview";
import ProductTable from "../../components/adminProducts/ProductTable";
import { initialForm } from "../../constants/productConstants";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productApi";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal/ConfirmDeleteModal";

const AdminProducts = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [marcaFiltro, setMarcaFiltro] = useState("Todas");
  const [ordenAdmin, setOrdenAdmin] = useState("relevancia");
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const formSectionRef = useRef(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [soloOfertas, setSoloOfertas] = useState(false);

  const obtenerProductos = async () => {
    try {
      const data = await getProducts();
      setProductos(data);
    } catch (error) {
      console.log("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    obtenerProductos();
  }, []);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    }

    if (form.precio === "" || Number(form.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0";
    }

    if (form.stock === "" || Number(form.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser negativo";
    }

    if (!form.categoria.trim()) {
      nuevosErrores.categoria = "La categoría es obligatoria";
    }
    if (!form.marca.trim()) {
      nuevosErrores.marca = "La marca es obligatoria";
    }

    if (!form.imageUrl.trim()) {
      nuevosErrores.imageUrl = "La URL de imagen es obligatoria";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  useEffect(() => {
    if (mostrarFormulario) {
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        const inputNombre = formSectionRef.current?.querySelector(
          'input[name="nombre"]',
        );

        inputNombre?.focus();
      }, 100);
    }
  }, [mostrarFormulario, editandoId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const limpiarFormulario = () => {
    setForm(initialForm);
    setEditandoId(null);
    setErrores({});
  };
  const limpiarFiltrosAdmin = () => {
    setBusqueda("");
    setCategoriaFiltro("Todas");
    setMarcaFiltro("Todas");
    setOrdenAdmin("relevancia");
    setSoloOfertas(false);
  };

  const abrirNuevoProducto = () => {
    limpiarFormulario();
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      toast.error("Revisá los campos del formulario");
      return;
    }

    setLoading(true);

    const estabaEditando = Boolean(editandoId);

    const productoEnviar = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
      imagenes: form.imagenes.filter((imagen) => imagen.trim() !== ""),
    };

    try {
      if (estabaEditando) {
        await updateProduct(editandoId, productoEnviar);
        toast.success("Producto actualizado correctamente");
      } else {
        await createProduct(productoEnviar);
        toast.success("Producto creado correctamente");
      }

      await obtenerProductos();
      limpiarFormulario();
      setMostrarFormulario(false);
    } catch (error) {
      console.log(error);

      toast.error(
        estabaEditando
          ? "Error al actualizar el producto"
          : "Error al crear el producto",
      );
    } finally {
      setLoading(false);
    }
  };

  const editarProducto = (producto) => {
    setForm({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio: producto.precio || "",
      stock: producto.stock || "",
      categoria: producto.categoria || "Electrodomesticos",
      marca: producto.marca || "Samsung",
      imageUrl: producto.imageUrl || "",
      imagenes:
        Array.isArray(producto.imagenes) && producto.imagenes.length > 0
          ? producto.imagenes
          : ["", "", "", ""],
      disponibilidad: producto.disponibilidad ?? true,
      oferta: producto.oferta ?? false,
    });

    setEditandoId(producto.id);
    setMostrarFormulario(true);
    setErrores({});
  };

  const abrirModalEliminar = (producto) => {
    setProductoAEliminar(producto);
  };

  const cerrarModalEliminar = () => {
    if (eliminando) return;
    setProductoAEliminar(null);
  };

  const confirmarEliminarProducto = async () => {
    if (!productoAEliminar) return;

    setEliminando(true);
    try {
      await deleteProduct(productoAEliminar.id);
      await obtenerProductos();

      toast.success("Producto eliminado correctamente");
      setProductoAEliminar(null);
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el producto");
    } finally {
      setEliminando(false);
    }
  };
  const marcasDisponibles = [
    ...new Set(
      productos
        .map((producto) => producto.marca)
        .filter((marca) => marca && marca !== "Sin marca"),
    ),
  ].sort();
  const productosFiltrados = productos
    .filter((producto) => {
      const texto = busqueda.toLowerCase();

      const coincideOferta = !soloOfertas || producto.oferta === true;

      const coincideBusqueda =
        producto.nombre?.toLowerCase().includes(texto) ||
        producto.categoria?.toLowerCase().includes(texto) ||
        producto.descripcion?.toLowerCase().includes(texto) ||
        producto.marca?.toLowerCase().includes(texto);

      const coincideCategoria =
        categoriaFiltro === "Todas" || producto.categoria === categoriaFiltro;

      const coincideMarca =
        marcaFiltro === "Todas" || producto.marca === marcaFiltro;

      return coincideBusqueda && coincideCategoria && coincideMarca && coincideOferta;
    })
    .sort((a, b) => {
      if (ordenAdmin === "oferta") {
        if (a.oferta && !b.oferta) return -1;
        if (!a.oferta && b.oferta) return 1;
        if (a.oferta && b.oferta) return Number(a.precio) - Number(b.precio);
      }

      if (ordenAdmin === "precioMenor") {
        return Number(a.precio) - Number(b.precio);
      }

      if (ordenAdmin === "precioMayor") {
        return Number(b.precio) - Number(a.precio);
      }

      if (ordenAdmin === "stockMayor") {
        return Number(b.stock) - Number(a.stock);
      }

      if (ordenAdmin === "stockMenor") {
        return Number(a.stock) - Number(b.stock);
      }

      if (ordenAdmin === "disponiblesPrimero") {
        return Number(b.disponibilidad) - Number(a.disponibilidad);
      }

      if (ordenAdmin === "noDisponiblesPrimero") {
        return Number(a.disponibilidad) - Number(b.disponibilidad);
      }

      return 0;
    });

  const handleImagenChange = (index, value) => {
    const nuevasImagenes = [...form.imagenes];

    nuevasImagenes[index] = value;

    setForm((prev) => ({
      ...prev,
      imagenes: nuevasImagenes,
    }));
  };

  return (
    <>
      <AdminProductToolbar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        categoriaFiltro={categoriaFiltro}
        setCategoriaFiltro={setCategoriaFiltro}
        marcaFiltro={marcaFiltro}
        setMarcaFiltro={setMarcaFiltro}
        marcasDisponibles={marcasDisponibles}
        ordenAdmin={ordenAdmin}
        setOrdenAdmin={setOrdenAdmin}
        limpiarFiltrosAdmin={limpiarFiltrosAdmin}
        abrirNuevoProducto={abrirNuevoProducto}
        soloOfertas={soloOfertas}
        setSoloOfertas={setSoloOfertas}
      />

      {mostrarFormulario && (
        <div className="admin-form-preview" ref={formSectionRef}>
          <ProductAdminForm
            form={form}
            errores={errores}
            editandoId={editandoId}
            loading={loading}
            handleChange={handleChange}
            handleImagenChange={handleImagenChange}
            handleSubmit={handleSubmit}
            limpiarFormulario={limpiarFormulario}
            cerrarFormulario={cerrarFormulario}
          />
          <ProductPreview form={form} />
        </div>
      )}

      <ProductTable
        productosFiltrados={productosFiltrados}
        productos={productos}
        editarProducto={editarProducto}
        eliminarProducto={abrirModalEliminar}
      />

      <ConfirmDeleteModal
        producto={productoAEliminar}
        cerrarModal={cerrarModalEliminar}
        confirmarEliminar={confirmarEliminarProducto}
        eliminando={eliminando}
      />
    </>
  );
};

export default AdminProducts;
