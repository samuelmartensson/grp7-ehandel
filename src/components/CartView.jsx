import React from 'react';
import Loader from './Loader';

export default function CartView({
  isLoading,
  products,
  handleRemove,
  handlePlaceOrder,
  displayTotal,
  orderName,
  couponCode,
  checkCoupon,
}) {
  return (
    <div className="cart">
      <h2 className="cart__subheader">Your cart</h2>
      <div className="cart__item-container">
        {isLoading && <Loader />}
        {products
          .sort((a, b) => b.price - a.price)
          .map((product, i) => {
            const item = product.item;
            return (
              <div className="cart__item" key={i}>
                <div className="cart__img-wrap">
                  <img src={item.images[0].src.small} alt="" />
                </div>
                <div className="cart__info-wrap">
                  <div className="cart__name">{item.name}</div>
                  <div className="cart__description">{item.description}</div>
                </div>
                <div className="cart__price">{item.price} SEK</div>
                <div className="cart__price">{product.quantity}</div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="cart__remove"
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" ref={orderName} type="text" />
        </div>
        <div>
          <label htmlFor="coupon">Coupon code</label>
          <input name="coupon" ref={couponCode} type="text" />
          <button onClick={checkCoupon}>Check</button>
        </div>
      </div>
      <div>Total: {displayTotal()} SEK</div>
      <button onClick={handlePlaceOrder}>Place order</button>
    </div>
  );
}
