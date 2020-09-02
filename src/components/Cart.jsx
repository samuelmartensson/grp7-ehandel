import React, { useState, useEffect, useRef } from 'react';
import CartView from './CartView';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const orderName = useRef();

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
  function displayTotal() {
    if (products.length > 0) {
      let total = products.reduce((acc, curr) => acc + curr.price, 0);
      return total;
    } else {
      return 0;
    }
  }
  function handlePlaceOrder() {
    const group = 'grupp7';
    const url = `https://mock-data-api.firebaseio.com/e-commerce/orders/${group}.json`;
    const data = {
      name: orderName.current.value,
      ordered_products: products,
      total: displayTotal(),
    };
    console.log(data);
    // fetch(url, { method: 'POST', body: JSON.stringify(data) })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     orderName.current.value = '';
    //   });
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <CartView
      isLoading={isLoading}
      displayTotal={displayTotal}
      handlePlaceOrder={handlePlaceOrder}
      handleRemove={handleRemove}
      orderName={orderName}
      products={products}
    />
  );
}
