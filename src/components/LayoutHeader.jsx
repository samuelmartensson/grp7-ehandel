import React from 'react';
import { Link } from 'react-router-dom';
import CartCounter from './CartCounter';
import CartBtn from './CartBtn';

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
      </div>

      {children}
    </div>
  );
}
