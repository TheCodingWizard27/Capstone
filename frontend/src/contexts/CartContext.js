import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { currentUser } = useAuth(); // Access currentUser from AuthContext

  useEffect(() => {
    const updateCartCount = () => {
      if (currentUser) {
        const userId = currentUser.uid;
        const storedCart =
          JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        const totalCount = storedCart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartCount(totalCount); // Update cart count
      } else {
        setCartCount(0); // Reset cart count if user logs out
      }
    };

    updateCartCount(); // Initial load to set the cart count

    // Listen for changes in localStorage (cart changes)
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount); // Clean up on unmount
    };
  }, [currentUser]); // Dependency array to track `currentUser` changes

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
