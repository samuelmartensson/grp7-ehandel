import React from 'react';
import CartCounter from './CartCounter';

export default function CartBtn({ toggleCart }) {
  return (
    <button onClick={toggleCart} className="cart-link">
      <div className="img-wrap">
        <img src={require('../cart-icon.png')} />
        <CartCounter />
      </div>
    </button>
  );
}
