import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { productIds, setProductIds } = useContext(CartContext);
  function mapIdsToUrl() {
    let list;

    if (localStorage.getItem('cart')) {
      list = JSON.parse(localStorage.getItem('cart')).map((id) => {
        return `https://mock-data-api.firebaseio.com/e-commerce/products/${id}.json`;
      });
    } else {
      list = productIds.map((id) => {
        return `https://mock-data-api.firebaseio.com/e-commerce/products/${id}.json`;
      });
    }
    return list;
  }

  function fetchAllProducts() {
    let urls = mapIdsToUrl();
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setProducts((prevState) => [...prevState, data]);
            console.log(data);
          })
      )
    );
  }
  function handleRemove(productId) {
    setProductIds((prevState) =>
      prevState.filter((item) => item !== productId)
    );
    setProducts((prevState) =>
      prevState.filter((item) => item.id !== productId)
    );
    let store = JSON.parse(localStorage.getItem('cart')).filter(
      (item) => item !== productId
    );
    localStorage.setItem('cart', JSON.stringify(store));
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className="cart">
      <h2 className="cart__subheader">Your cart</h2>
      <div className="cart__item-container">
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
                <button
                  onClick={() => handleRemove(product.id)}
                  className="cart__remove"
                >
                  Remove
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
