import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import CategoriesNav from "./CategoriesNav";
import Banner from "./Banner";
import Benefits from "./Benefits";
import FeaturedProducts from "./FeaturedProducts";
import Brands from "./Brands";
import Footer from "./Footer";

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

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setDataList(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (location.state) {
      setCategoriaSeleccionada(
        location.state.categoriaSeleccionada || "Catalogo",
      );

      setMostrarTodos(location.state.mostrarTodos || false);

      setBusqueda(location.state.busqueda || "");
    }
  }, [location.state]);

 const productosFiltrados = dataList.filter((producto) => {
  const texto = busqueda.toLowerCase();

  const estaDisponible = producto.disponibilidad === true;

  const coincideCategoria =
    categoriaSeleccionada === "Catalogo" ||
    producto.categoria === categoriaSeleccionada;

  const coincideBusqueda =
    producto.nombre?.toLowerCase().includes(texto) ||
    producto.categoria?.toLowerCase().includes(texto) ||
    producto.descripcion?.toLowerCase().includes(texto);

  return estaDisponible && coincideCategoria && coincideBusqueda;
});

  const sinResultados =
    productosFiltrados.length === 0 &&
    (busqueda !== "" || categoriaSeleccionada !== "Catalogo");

  return (
    <>
      <Header
        textoBusqueda={textoBusqueda}
        setTextoBusqueda={setTextoBusqueda}
        setBusqueda={setBusqueda}
      />

      <CategoriesNav
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
        {sinResultados ? (
          <div className="no-results">
            <h2>No se encontraron productos</h2>

            <p>
              No existen productos que coincidan con:
              <strong> "{busqueda}"</strong>
            </p>

            <button
              className="reset-search-btn"
              onClick={() => {
                setBusqueda("");
                setTextoBusqueda("");
                setCategoriaSeleccionada("Catalogo");
                setMostrarTodos(false);
              }}
            >
              Volver al catálogo
            </button>
          </div>
        ) : (
          <FeaturedProducts
            productos={productosFiltrados}
            mostrarTodos={mostrarTodos}
            setMostrarTodos={setMostrarTodos}
          />
        )}
      </main>
      <Brands />

      <Footer />
    </>
  );
};

export default Dashboard;
