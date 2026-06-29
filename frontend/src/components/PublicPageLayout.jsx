import { useState } from "react";
import Header from "./Header";
import CategoriesNav from "./CategoriesNav";
import Footer from "./Footer";

const PublicPageLayout = ({ children }) => {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Catalogo");
  const [, setMostrarTodos] = useState(false);

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

      <main className="container-fluid mt-4 px-4 page-content">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default PublicPageLayout;
