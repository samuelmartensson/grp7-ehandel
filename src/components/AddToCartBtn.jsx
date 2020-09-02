import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function AddToCartBtn({ id }) {
  const { handleAddToCart } = useContext(CartContext);
  return (
    <button className="product__cartbutton" onClick={() => handleAddToCart(id)}>
      BUY
    </button>
  );
}
