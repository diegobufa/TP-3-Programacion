/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import { createOrder as createOrderApi } from "../services/orderApi";

const CartContext = createContext();

const normalizarProductoCarrito = (product) => ({
  ...product,
  nombre: product.nombre ?? product.name ?? "Producto sin nombre",
  precio: Number(product.precio ?? product.price ?? 0),
  stock: Number(product.stock ?? 0),
  imageUrl: product.imageUrl ?? product.imagen ?? "",
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, quantity = 1) => {
    const cantidad = Number(quantity);
    const productoNormalizado = normalizarProductoCarrito(product);
    const stock = productoNormalizado.stock;

    if (!product?.id) {
      alert("No se pudo agregar el producto al carrito.");
      return false;
    }

    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      alert("La cantidad debe ser mayor a 0.");
      return false;
    }

    const productoExistente = cart.find((item) => item.id === product.id);
    const cantidadActual = productoExistente ? productoExistente.quantity : 0;
    const nuevaCantidad = cantidadActual + cantidad;

    if (nuevaCantidad > stock) {
      alert(`No podés agregar más de este producto. Stock límite: ${stock}`);
      return false;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + cantidad }
            : item,
        );
      }

      return [...prevCart, { ...productoNormalizado, quantity: cantidad }];
    });

    return true;
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity, stock) => {
    const cantidad = Number(newQuantity);
    const stockDisponible = Number(stock) || 0;

    if (cantidad <= 0) {
      removeFromCart(productId);
      return;
    }

    if (cantidad > stockDisponible) {
      alert(`Límite de stock alcanzado (${stockDisponible})`);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: cantidad } : item,
      ),
    );
  };

  const getSubtotal = () =>
    cart.reduce(
      (acc, item) => acc + Number(item.precio ?? item.price ?? 0) * item.quantity,
      0,
    );

  const getTotal = () => getSubtotal();
  const clearCart = () => setCart([]);

  const createOrder = async (customerData) => {
    const pedido = {
      fk_usuario: customerData.fk_usuario,
      direccion_envio: customerData.direccion,
      provincia_envio: customerData.provincia,
      localidad_envio: customerData.localidad,
      detalles: cart.map((item) => ({
        fk_producto: item.id,
        cantidad: item.quantity,
      })),
    };

    const nuevoPedido = await createOrderApi(pedido);
    clearCart();
    return nuevoPedido;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getSubtotal,
        getTotal,
        clearCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
