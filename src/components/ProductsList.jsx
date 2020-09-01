import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductsList() {
  const [data, setData] = useState({});
  const { handleAddToCart } = useContext(CartContext);

  function fetchData() {
    fetch('https://mock-data-api.firebaseio.com/e-commerce/products.json')
      .then((res) => res.json())
      .then((items) => {
        setData(items);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {data &&
        Object.entries(data).map((item) => {
          const key = item[0];
          const payload = item[1];

          return (
            <div key={key}>
              {payload.name}
              <Link to={`/products/${payload.id}`}>Go to product detail</Link>
              <button onClick={() => handleAddToCart(payload.id)}>
                Add to cart
              </button>
            </div>
          );
        })}
    </div>
  );
}
