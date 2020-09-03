import React, { useState, useEffect, useRef, useContext } from 'react';
import CartView from './CartView';
import { CartContext } from '../context/CartContext';
import CartKit from '../cart';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [notDiscounted, setNotDiscounted] = useState(true);
  const orderName = useRef();
  const couponCode = useRef();
  const { productIds, setProductIds } = useContext(CartContext);
  const cart = new CartKit();

  function mapIdsToUrl() {
    //Converts array of ids and quantity to array with fetch urls and quantity
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
      // Fetches all products from database by using product id in correct endpoint (see mapIdsToUrl function)
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
  function fetchCouponCodes() {
    fetch(`https://mock-data-api.firebaseio.com/e-commerce/couponCodes.json`)
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data);
      });
  }
  function addCoupon() {
    if (
      Object.entries(coupons).find(
        (item) => item[0] === couponCode.current.value
      ) &&
      notDiscounted
    ) {
      const discount = coupons[couponCode.current.value].discount;
      setTotal((prevState) => Math.floor(prevState * discount));
      setNotDiscounted(false);
    } else {
      alert('Coupon does not exist');
    }
  }
  function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  function handlePlaceOrder() {
    const url = `https://mock-data-api.firebaseio.com/e-commerce/orders/group-7.json`;
    const data = {
      name: orderName.current.value,
      ordered_products: products,
      total: total,
    };
    fetch(url, { method: 'POST', body: JSON.stringify(data) })
      .then((res) => res.json())
      .then((data) => {
        clearCart();
      });
  }
  function handleQuantity(id, direction, stock) {
    const index = products.findIndex(
      (product) => product.item.id === parseInt(id)
    );
    let newArr = [...products];
    let value = cart.handleIncrement(newArr[index].quantity, direction);
    if (stock >= value) {
      newArr[index].quantity = value;
    } else {
      alert('No more available in stock');
    }
    setProducts(newArr);
    handleQtyInLS(value, id);
    if (value === 0) handleRemove(id);
  }
  function handleQtyInLS(value, id) {
    const index = productIds.findIndex((product) => product.id === id);
    let newArr = [...productIds];
    newArr[index].quantity = value;
    setProductIds(newArr);
  }

  useEffect(() => {
    fetchAllProducts(); // eslint-disable-next-line
    fetchCouponCodes(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Must run this with products in dependency array since products are loaded asynchronously
    setTotalPrice(); // eslint-disable-next-line
  }, [products]);

  return (
    <CartView
      isLoading={isLoading}
      handlePlaceOrder={handlePlaceOrder}
      handleRemove={handleRemove}
      products={products}
      orderName={orderName}
      couponCode={couponCode}
      addCoupon={addCoupon}
      total={total}
      notDiscounted={notDiscounted}
      handleQuantity={handleQuantity}
    />
  );
}
