import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false); 

    const openCart = () => setIsCartOpen(true);   
    const closeCart = () => setIsCartOpen(false); 

    const addToCart = (product, quantity) => {
        if (quantity > product.stock) {
            alert(`No hay suficiente stock. Máximo disponible: ${product.stock}`);
            return false;
        }

        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                const newQuantity = existingProduct.quantity + quantity;
                if (newQuantity > product.stock) {
                    alert(`No podés agregar más de este producto. Stock límite: ${product.stock}`);
                    return prevCart;
                }
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: newQuantity } : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
        return true;
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity, stock) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        if (newQuantity > stock) {
            alert(`Límite de stock alcanzado (${stock})`);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const getSubtotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const getTotal = () => getSubtotal();
    const clearCart = () => setCart([]);

    const createOrder = (customerData) => {
        const newOrder = {
            id: Math.floor(100000 + Math.random() * 900000).toString(),
            date: new Date().toLocaleDateString(),
            items: [...cart],
            total: getTotal(),
            customer: customerData,
            status: 'Pendiente'
        };
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        clearCart();
        return newOrder.id;
    };

    return (
        <CartContext.Provider value={{
            cart,
            orders,
            isCartOpen,   
            openCart,     
            closeCart,   
            addToCart,
            removeFromCart,
            updateQuantity,
            getSubtotal,
            getTotal,
            clearCart,
            createOrder
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);