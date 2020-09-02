import React from 'react';
import Loader from './Loader';

export default function CartView({
  isLoading,
  products,
  handleRemove,
  handlePlaceOrder,
  displayTotal,
  orderName,
}) {
  return (
    <div className="cart">
      <h2 className="cart__subheader">Your cart</h2>
      <div className="cart__item-container">
        {isLoading && <Loader />}
        {products
          .sort((a, b) => b.price - a.price)
          .map((product, i) => {
            return (
              <div className="cart__item" key={i}>
                <div className="cart__img-wrap">
                  <img src={product.images[0].src.small} alt="" />
                </div>
                <div className="cart__info-wrap">
                  <div className="cart__name">{product.name}</div>
                  <div className="cart__description">{product.description}</div>
                </div>
                <div className="cart__price">{product.price} SEK</div>
                <div className="cart__price">
                  {
                    JSON.parse(localStorage.getItem('cart')).filter(
                      (item) => item.id === product.id
                    )[0].quantity
                  }
                </div>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="cart__remove"
                >
                  Remove
                </button>
              </div>
            );
          })}
        <div>Total: {displayTotal()} SEK</div>
        <input ref={orderName} type="text" />
        <button onClick={handlePlaceOrder}>Place order</button>
      </div>
    </div>
  );
}
