import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0)

  useEffect(() => {
    let totalQuantity = 0;
    cart.forEach((prod) => (totalQuantity += prod.quantity));
    setTotalQuantity(totalQuantity);
    updateTotalToPay();
  }, [cart]);
  
  const updateTotalToPay = () => {
    let total = 0
    cart.forEach(prod => {
      total += prod.quantity * prod.price
    })
    
    setTotalToPay(total)
  }

  const addItem = (productToAdd) => {
    if (!isInCart(productToAdd.id)) {
      setCart([...cart, productToAdd]);
    }
  };

  const removeItem = (id) => {
    
    const cartWithoutProduct = cart.filter((prod) => prod.id !== id);
    setCart(cartWithoutProduct);
    
  };

  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  const clear = () =>{
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, totalQuantity, addItem, removeItem, isInCart, clear, totalToPay }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
