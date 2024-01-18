import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try{

      let existingCartItem = localStorage.getItem("cart");
      if (existingCartItem) {
        setCart(JSON.parse(existingCartItem));
      }
    }catch(error){
      console.error("Error parsing cart data:", error);
    // Handle the error, possibly by resetting the cart to an empty state
    setCart([]);
    }
  }, []);

  return (
    <>
      <CartContext.Provider value={[cart, setCart]}>
        {children}
      </CartContext.Provider>
    </>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
