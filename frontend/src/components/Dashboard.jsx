import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import CategoriesNav from "./CategoriesNav";
import Banner from "./Banner";
import Benefits from "./Benefits";
import FeaturedProducts from "./FeaturedProducts";
import Brands from "./Brands";
import Footer from "./Footer";
import CatalogFilters from "./CatalogFilters";

const Dashboard = () => {
  const location = useLocation();

  const [dataList, setDataList] = useState([]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    location.state?.categoriaSeleccionada || "Catalogo",
  );

  const [mostrarTodos, setMostrarTodos] = useState(
    location.state?.mostrarTodos || false,
  );

  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [busqueda, setBusqueda] = useState(location.state?.busqueda || "");

  const [categoriaFiltroCatalogo, setCategoriaFiltroCatalogo] =
    useState("Todas");
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("Todas");
  const [precioMinimo, setPrecioMinimo] = useState("");
  const [precioMaximo, setPrecioMaximo] = useState("");
  const [soloOferta, setSoloOferta] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState("relevancia");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setDataList(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (location.state) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategoriaSeleccionada(
        location.state.categoriaSeleccionada || "Catalogo",
      );

      setMostrarTodos(location.state.mostrarTodos || false);

      setBusqueda(location.state.busqueda || "");
    }
  }, [location.state]);

  const mostrarFiltrosCatalogo = mostrarTodos;

  const categoriasDisponibles = [
    ...new Set(dataList.map((producto) => producto.categoria).filter(Boolean)),
  ].sort();

  const marcasDisponibles = [
    ...new Set(
      dataList
        .map((producto) => producto.marca)
        .filter((marca) => marca && marca !== "Sin marca"),
    ),
  ].sort();
  
  const filtrosActivos =
    categoriaFiltroCatalogo !== "Todas" ||
    marcaSeleccionada !== "Todas" ||
    precioMinimo !== "" ||
    precioMaximo !== "" ||
    soloOferta ||
    ordenarPor !== "relevancia";

  const limpiarFiltros = () => {
    setCategoriaFiltroCatalogo("Todas");
    setMarcaSeleccionada("Todas");
    setPrecioMinimo("");
    setPrecioMaximo("");
    setSoloOferta(false);
    setOrdenarPor("relevancia");
  };

  const productosFiltrados = dataList
    .filter((producto) => {
      const texto = busqueda.toLowerCase();

      const estaDisponible = producto.disponibilidad === true;

      const coincideCategoriaNav =
        categoriaSeleccionada === "Catalogo" ||
        producto.categoria === categoriaSeleccionada;

      const coincideBusqueda =
        producto.nombre?.toLowerCase().includes(texto) ||
        producto.categoria?.toLowerCase().includes(texto) ||
        producto.descripcion?.toLowerCase().includes(texto) ||
        producto.marca?.toLowerCase().includes(texto);

      const precioProducto = Number(producto.precio);

      const coincideCategoriaFiltro =
        categoriaFiltroCatalogo === "Todas" ||
        producto.categoria === categoriaFiltroCatalogo;

      const coincideMarca =
        !mostrarFiltrosCatalogo ||
        marcaSeleccionada === "Todas" ||
        producto.marca === marcaSeleccionada;

      const coincidePrecioMinimo =
        !mostrarFiltrosCatalogo ||
        precioMinimo === "" ||
        precioProducto >= Number(precioMinimo);

      const coincidePrecioMaximo =
        !mostrarFiltrosCatalogo ||
        precioMaximo === "" ||
        precioProducto <= Number(precioMaximo);

      const coincideOferta =
        !mostrarFiltrosCatalogo || !soloOferta || producto.oferta === true;

      return (
        estaDisponible &&
        coincideCategoriaNav &&
        coincideBusqueda &&
        coincideCategoriaFiltro &&
        coincideMarca &&
        coincidePrecioMinimo &&
        coincidePrecioMaximo &&
        coincideOferta
      );
    })
    .sort((a, b) => {
      if (!mostrarFiltrosCatalogo) {
        return 0;
      }

      if (ordenarPor === "menorPrecio") {
        return Number(a.precio) - Number(b.precio);
      }

      if (ordenarPor === "mayorPrecio") {
        return Number(b.precio) - Number(a.precio);
      }

      if (ordenarPor === "nombre") {
        return a.nombre.localeCompare(b.nombre);
      }

      return 0;
    });

  const sinResultados =
    productosFiltrados.length === 0 &&
    (busqueda !== "" || categoriaSeleccionada !== "Catalogo" || filtrosActivos);

  return (
    <>
      <Header
        textoBusqueda={textoBusqueda}
        setTextoBusqueda={setTextoBusqueda}
        setBusqueda={setBusqueda}
      />

      <CategoriesNav
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        setMostrarTodos={setMostrarTodos}
        setBusqueda={setBusqueda}
        setTextoBusqueda={setTextoBusqueda}
      />

      {!mostrarTodos &&
        busqueda === "" &&
        categoriaSeleccionada === "Catalogo" && (
          <>
            <Banner />
            <Benefits />
          </>
        )}

      <main className="container-fluid mt-4 px-4">
        <div
          className={
            mostrarFiltrosCatalogo
              ? "catalog-page-layout"
              : "catalog-page-simple"
          }
        >
          {mostrarFiltrosCatalogo && (
            <CatalogFilters
              categoriasDisponibles={categoriasDisponibles}
              marcasDisponibles={marcasDisponibles}
              categoriaFiltroCatalogo={categoriaFiltroCatalogo}
              setCategoriaFiltroCatalogo={setCategoriaFiltroCatalogo}
              marcaSeleccionada={marcaSeleccionada}
              setMarcaSeleccionada={setMarcaSeleccionada}
              precioMinimo={precioMinimo}
              setPrecioMinimo={setPrecioMinimo}
              precioMaximo={precioMaximo}
              setPrecioMaximo={setPrecioMaximo}
              soloOferta={soloOferta}
              setSoloOferta={setSoloOferta}
              limpiarFiltros={limpiarFiltros}
            />
          )}

          <div className="catalog-products-content">
            {sinResultados ? (
              <div className="no-results">
                <h2>No se encontraron productos</h2>

                <p>
                  No existen productos que coincidan con los filtros
                  seleccionados.
                </p>

                <button
                  className="reset-search-btn"
                  onClick={() => {
                    setBusqueda("");
                    setTextoBusqueda("");
                    setCategoriaSeleccionada("Catalogo");
                    setMostrarTodos(true);
                    limpiarFiltros();
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <FeaturedProducts
                productos={productosFiltrados}
                mostrarTodos={mostrarTodos}
                setMostrarTodos={setMostrarTodos}
                mostrarOrdenamiento={mostrarFiltrosCatalogo}
                ordenarPor={ordenarPor}
                setOrdenarPor={setOrdenarPor}
              />
            )}
          </div>
        </div>
      </main>

      <Brands />

      <Footer />
    </>
  );
};

export default Dashboard;
