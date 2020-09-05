import React from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import CartBtn from './CartBtn';

export default function CartAsyncView({
  isLoading,
  products,
  handleRemove,
  isOpen,
  total,
  toggleCart,
  handleQuantity,
}) {
  return (
    <>
      {isOpen && (
        <div onClick={toggleCart} className="cart-async__overlay"></div>
      )}
      <div style={{ right: isOpen ? '0px' : '-300px' }} className="cart-async">
        <CartBtn toggleCart={toggleCart} />
        <h2 className="cart-async__subheader">Your cart</h2>
        <div className="cart-async__item-container">
          {isLoading && <Loader />}
          {products.length === 0 && !isLoading ? (
            <h2 className="cart-async__empty">Your cart is empty.</h2>
          ) : (
            products
              .sort((a, b) => a.item.price - b.item.price)
              .map((product, i) => {
                const item = product.item;
                return (
                  <div id={item.id} className="cart-async__item" key={i}>
                    <Link to={`/products/${item.id}`}>
                      <div className="cart-async__img-wrap">
                        <img src={item.images[0].src.small} alt="" />
                      </div>
                    </Link>
                    <div className="cart-async__info-wrap">
                      <div className="cart-async__name">
                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                      </div>
                      <div className="cart-async__price">
                        {product.quantity} * {item.price} ={' '}
                        {product.quantity * item.price} SEK
                      </div>
                    </div>
                    <div className="cart-async__qty-wrap">
                      <button
                        onClick={() =>
                          handleQuantity(item.id, 'down', item.stock)
                        }
                        className="cart-async__qty-down"
                      >
                        -
                      </button>
                      <div className="cart-async__qty">{product.quantity}</div>
                      <button
                        onClick={() =>
                          handleQuantity(item.id, 'up', item.stock)
                        }
                        className="cart-async__qty-up"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="cart-async__remove"
                    >
                      Remove
                    </button>
                  </div>
                );
              })
          )}
        </div>
        <div className="cart-async__input-wrapper">
          <div className="cart-async__total">Subtotal: {total} SEK</div>
          <Link className="cart-async__checkout" to="/cart">
            <div>
              <span>Checkout</span>
              <i className="fas fa-angle-right"></i>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
