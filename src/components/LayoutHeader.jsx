import React from 'react';
import { Link } from 'react-router-dom';
import CartCounter from './CartCounter';

export default function LayoutHeader({ children }) {
  return (
    <div>
      <div className="menu">
        <div className="cloud">
          <Link className="link" to="/">
            7th Heaven
          </Link>
          <div className="cloud-sm">
            <div className="cloud-lg"></div>
          </div>
        </div>

        <Link className="cart-link" to="/cart">
          <div className="img-wrap">
            <img src={require('../images/cart-icon.png')} />
            <CartCounter />
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
}
