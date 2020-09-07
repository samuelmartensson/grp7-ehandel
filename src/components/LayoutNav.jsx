import React from "react";
import { Link } from "react-router-dom";
import CartCounter from "./CartCounter";

export default function LayoutNav({ children }) {
  return (
    <div>
      <div className="menu">
        <Link className="link-home" to="/">
          7th Heaven
        </Link>

        <Link className="cart-link" to="/cart">
          <div className="img-wrap">
            <img src={require("../images/cart-icon.png")} />
            <CartCounter />
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
}
