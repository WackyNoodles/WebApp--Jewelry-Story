// CartContext.js

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item._id === product._id);
        
        if (existingItem) {
            const updatedCart = cartItems.map(item =>
                item._id === product._id ? { ...item, quantity: item.quantity + product.quantity } : item
            );
            setCartItems(updatedCart);
        } else {
            // If item doesn't exist, add it with the provided quantity
            setCartItems([...cartItems, product]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
    };

    const updateCartItemQuantity = (productId, quantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, cartTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
