import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function AddToCartBtn({ id, stock }) {
  const { handleAddToCart } = useContext(CartContext);
  return (
    <button
      className="product__cartbutton detail__info-btn"
      onClick={() => handleAddToCart(id, stock)}
    >
      BUY
    </button>
  );
}
