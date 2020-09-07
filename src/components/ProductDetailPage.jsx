import React, { useEffect } from 'react';
import { useState } from 'react';
import Reviews from './Reviews';
import AddToCartBtn from './AddToCartBtn';
import Loader from './Loader';

export default function ProductDetailPage(props) {
  const [product, setProduct] = useState('');
  const productId = props.match.params.id;
  useEffect(() => {
    fetch(
      `https://mock-data-api.firebaseio.com/e-commerce/products/${productId}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [productId]);

  function renderProduct() {
    if (product === '') {
      return <Loader />;
    } else {
      return (
        <div className="detail">
          <div className="detail__img-wrapper">
            <img
              className="detail__img"
              src={product.images[0].src.small}
              alt={product.images[0].alt}
            />
          </div>
          <div className="detail__info">
            <h1 className="detail__header">{product.name}</h1>
            <ol className="detail__list">
              <li className="detail__list-item">{product.description}</li>
              <li className="detail__list-item">{`${product.price} kr `}</li>
              <li className="detail__list-item">{`Rating: ${product.rating}`}</li>
              <li className="detail__list-item">{`Stock: ${product.stock} st`}</li>
            </ol>
            <AddToCartBtn id={parseInt(productId)} stock={product.stock} />
          </div>
          <div className="detail__reviews">
            <Reviews id={productId} />
          </div>
        </div>
      );
    }
  }

  return <div>{renderProduct()}</div>;
}
