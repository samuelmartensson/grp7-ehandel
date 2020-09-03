import React from 'react';
import { Link } from 'react-router-dom';
import CartCounter from './CartCounter';

export default function LayoutHeader({ children }) {
  return (
    <div>
      <div className="menu">
        <Link className="link" to="/">
          7th Heaven
        </Link>
        <Link className="cart-link" to="/cart">
          <div className="img-wrap">
            <img src={require('../cart-icon.png')} />
            <CartCounter />
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
}
