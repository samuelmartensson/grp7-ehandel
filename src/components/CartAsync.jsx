import React, { useState, useEffect, useRef, useContext } from 'react';
import CartAsyncView from './CartAsyncView';
import { CartContext } from '../context/CartContext';
import CartKit from '../cart';

export default function CartAsync() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { productIds, setProductIds } = useContext(CartContext);
  const cart = new CartKit();

  function mapIdsToUrl() {
    //Converts array of ids and quantity to array with fetch urls and quantity
    let list;
    if (localStorage.getItem('cart')) {
      list = productIds.map((product) => {
        return {
          url: `https://mock-data-api.firebaseio.com/e-commerce/products/${product.id}.json`,
          quantity: product.quantity,
        };
      });
    }
    return list;
  }

  function fetchAllProducts() {
    setProducts([]);
    setIsLoading(true);
    let urls = mapIdsToUrl();
    if (urls.length === 0) {
      setIsLoading(false);
    } else {
      // Fetches all products from database by using product id in correct endpoint (see mapIdsToUrl function)
      Promise.all(
        urls.map((url) =>
          fetch(url.url)
            .then((res) => res.json())
            .then((data) => {
              setProducts((prevState) =>
                [...prevState, { item: data, quantity: url.quantity }].sort(
                  (a, b) => a - b
                )
              );
              setIsLoading(false);
            })
        )
      );
    }
  }

  function handleRemove(productId) {
    //Removes item from state by filtering current depending array
    setProductIds((prevState) =>
      prevState.filter((product) => product.id !== productId)
    );
    setProducts((prevState) =>
      prevState.filter((product) => product.item.id !== productId)
    );
  }
  function setTotalPrice() {
    setTotal(cart.calculateTotalPrice(products));
  }

  function handleQuantity(id, direction, stock) {
    const index = products.findIndex(
      (product) => product.item.id === parseInt(id)
    );
    let newArr = [...products];
    let value = cart.handleIncrement(newArr[index].quantity, direction);
    if (stock >= value) {
      newArr[index].quantity = value;
      handleQtyInLS(value, id);
    } else {
      alert('No more available in stock');
    }
    setProducts(newArr);
    if (value === 0) handleRemove(id);
  }
  function handleQtyInLS(value, id) {
    const index = productIds.findIndex((product) => product.id === id);
    let newArr = [...productIds];
    newArr[index].quantity = value;
    setProductIds(newArr);
  }
  function handleOpenState() {
    setIsOpen((prevState) => !prevState);
    if (!isOpen) {
      document.querySelector('body').style = 'overflow: hidden';
    }
  }

  useEffect(() => {
    fetchAllProducts(); // eslint-disable-next-line
  }, [productIds]);

  useEffect(() => {
    if (isOpen) {
      fetchAllProducts();
    } else {
      document.querySelector('body').style = 'overflow: visible';
    }
  }, [isOpen]);
  useEffect(() => {
    // Must run this with products in dependency array since products are loaded asynchronously
    setTotalPrice(); // eslint-disable-next-line
  }, [products]);

  return (
    <CartAsyncView
      isOpen={isOpen}
      toggleCart={handleOpenState}
      isLoading={isLoading}
      handleRemove={handleRemove}
      products={products}
      total={total}
      handleQuantity={handleQuantity}
    />
  );
}
