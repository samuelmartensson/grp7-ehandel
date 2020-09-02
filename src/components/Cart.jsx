import React, { useState, useEffect, useRef, useContext } from 'react';
import CartView from './CartView';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const orderName = useRef();
  const couponCode = useRef();
  const { setProductIds } = useContext(CartContext);
  function mapIdsToUrl() {
    let list;
    if (localStorage.getItem('cart')) {
      list = JSON.parse(localStorage.getItem('cart')).map((product) => {
        return {
          url: `https://mock-data-api.firebaseio.com/e-commerce/products/${product.id}.json`,
          quantity: product.quantity,
        };
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
          fetch(url.url)
            .then((res) => res.json())
            .then((data) => {
              setProducts((prevState) => [
                ...prevState,
                { item: data, quantity: url.quantity },
              ]);
              setIsLoading(false);
            })
        )
      );
    }
  }
  function handleRemove(productId) {
    //Removes item from state and LS
    setProductIds((prevState) =>
      prevState.filter((product) => product.id !== productId)
    );
    setProducts((prevState) =>
      prevState.filter((product) => product.item.id !== productId)
    );
    let store = JSON.parse(localStorage.getItem('cart')).filter(
      (item) => item.id !== productId
    );
    localStorage.setItem('cart', JSON.stringify(store));
  }
  function displayTotal() {
    if (products.length > 0) {
      let total = products.reduce(
        (acc, curr) => acc + curr.item.price * curr.quantity,
        0
      );

      // if (couponCode.current.value) {
      //   console.log(couponCode.current.value);
      //   return total * checkCoupon(couponCode.current.value);
      // }
      return total;
    } else {
      return 0;
    }
  }
  function checkCoupon(code) {
    console.log(code);
    // fetch(
    //   `https://mock-data-api.firebaseio.com/e-commerce/couponCodes/${code}.json`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.valid) {
    //       console.log('valid');
    //       return data.discount;
    //     } else {
    //       return 1;
    //     }
    //   });
  }
  function handlePlaceOrder() {
    const url = `https://mock-data-api.firebaseio.com/e-commerce/orders/group-7.json`;
    const data = {
      name: orderName.current.value,
      ordered_products: products,
      total: displayTotal(),
    };
    fetch(url, { method: 'POST', body: JSON.stringify(data) })
      .then((res) => res.json())
      .then((data) => {
        orderName.current.value = '';
      });
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
      products={products}
      orderName={orderName}
      couponCode={couponCode}
      checkCoupon={checkCoupon}
    />
  );
}
