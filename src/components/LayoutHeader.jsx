import React from 'react';
import { Link } from 'react-router-dom';

export default function LayoutHeader({ children }) {
  return (
    <div>
      <div className="menu">
        <Link className="link" to="/">
          7th Heaven
        </Link>
      </div>

      {children}
    </div>
  );
}
