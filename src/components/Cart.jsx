import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { productIds } = useContext(CartContext);

  function mapIdsToUrl() {
    let list;
    if (localStorage.getItem('cart')) {
      list = JSON.parse(localStorage.getItem('cart')).map((product) => {
        return `https://mock-data-api.firebaseio.com/e-commerce/products/${product.id}.json`;
      });
    }
    return list;
  }

  function fetchAllProducts() {
    let urls = mapIdsToUrl();

    if (urls.length === 0) {
      setIsLoading(false);
    } else {
      Promise.all(
        urls.map((url) =>
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              setProducts((prevState) => [...prevState, data]);
              setIsLoading(false);
            })
        )
      );
    }
  }
  function handleRemove(productId) {
    //Removes item from cart and LS
    setProducts((prevState) =>
      prevState.filter((item) => item.id !== productId)
    );
    let store = JSON.parse(localStorage.getItem('cart')).filter(
      (item) => item.id !== productId
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
      </div>
    </div>
  );
}
