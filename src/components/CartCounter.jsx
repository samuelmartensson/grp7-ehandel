import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartCounter() {
  const { productIds } = useContext(CartContext);

  function displayQuantity() {
    let totalQuantity = productIds.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
    return totalQuantity;
  }

  return <div>{productIds && displayQuantity()}</div>;
}
