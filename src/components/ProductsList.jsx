import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCartBtn from './AddToCartBtn';
import Loader from './Loader';

export default function ProductsList() {
  const [data, setData] = useState({});

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
    <div className="product">
      {Object.entries(data).length === 0 && <Loader />}
      {data &&
        Object.entries(data).map((item) => {
          const key = item[0];
          const payload = item[1];

          return (
            <div className="product__card" key={key}>
              <Link className="product__link" to={`/products/${payload.id}`}>
                <div className="product__card-wrapper">
                  <div className="product__img-wrapper">
                    <img
                      className="product__img"
                      src={payload.images[0].src.small}
                      alt={payload.images[0].alt}
                    />
                  </div>
                  <div className="product__info">
                    <h3 className="product__info-title"> {payload.name}</h3>
                    <p className="product__info-text">{`${payload.description.slice(
                      0,
                      20
                    )} ...`}</p>
                    <span className="product__info-price">{`${payload.price} kr `}</span>
                  </div>
                </div>
              </Link>
              <div className="product__cartbutton-wrapper">
                <AddToCartBtn id={payload.id} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
