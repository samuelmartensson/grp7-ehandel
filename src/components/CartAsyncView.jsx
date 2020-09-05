import React from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';

export default function CartAsyncView({
  isLoading,
  products,
  handleRemove,
  handlePlaceOrder,
  orderName,
  couponCode,
  addCoupon,
  total,
  notDiscounted,
  handleQuantity,
}) {
  return (
    <div className="cart">
      <h2 className="cart__subheader">Your cart</h2>
      <div className="cart__item-container">
        {isLoading && <Loader />}
        {products.length === 0 && !isLoading && (
          <span className="cart__empty">
            Your cart seems to be empty{' '}
            <span role="img" aria-label="shocked">
              😱
            </span>
          </span>
        )}
        {products.map((product, i) => {
          const item = product.item;
          return (
            <div id={item.id} className="cart__item" key={i}>
              <div className="cart__img-wrap">
                <img src={item.images[0].src.small} alt="" />
              </div>
              <div className="cart__info-wrap">
                <div className="cart__name">{item.name}</div>
                <div className="cart__price">{item.price} SEK</div>
              </div>
              <div className="cart__qty-wrap">
                <button
                  onClick={() => handleQuantity(item.id, 'down', item.stock)}
                  className="cart__qty-down"
                >
                  -
                </button>
                <div className="cart__qty">{product.quantity}</div>
                <button
                  onClick={() => handleQuantity(item.id, 'up', item.stock)}
                  className="cart__qty-up"
                >
                  +
                </button>
              </div>
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
      <div className="cart__input-wrapper">
        <div className="cart__input-container">
          <label htmlFor="name">Name</label>
          <input name="name" ref={orderName} type="text" />
          <label htmlFor="coupon">Coupon code</label>
          {notDiscounted ? (
            <>
              <div className="cart__coupon">
                <input name="coupon" ref={couponCode} type="text" />
                {products.length > 0 && (
                  <button onClick={addCoupon}>Check</button>
                )}
              </div>
            </>
          ) : (
            <span>Success!</span>
          )}
          <div className="cart__total">Total: {total} SEK</div>
          <Link
            className="cart__cta"
            onClick={handlePlaceOrder}
            to={{ pathname: '/order', products: products, total: total }}
          >
            Place order
          </Link>
        </div>
      </div>
    </div>
  );
}
