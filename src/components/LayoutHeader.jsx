import React from "react";
import { Link } from "react-router-dom";
import CartCounter from "./CartCounter";

export default function LayoutHeader({ children }) {
  return (
    <div>
      <div className="menu">
        <Link className="link" to="/">
          Start
        </Link>
        <Link className="link" to="/cart">
          Cart <CartCounter />
        </Link>
      </div>

      {children}
    </div>
  );
}
