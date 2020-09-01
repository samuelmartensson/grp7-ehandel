import React, { useEffect } from 'react';
import { useState } from 'react';
import Reviews from './Reviews';

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
      return <div>loading</div>;
    } else {
      return (
        <div>
          <ol>
            <li>{product.name}</li>
            <li>{product.description}</li>
            <li>{product.price}</li>
            <li>{product.rating}</li>
            <li>{product.stock}</li>
            <li>
              <img src={product.images[0].src.small} alt="" />
            </li>
          </ol>
          <Reviews id={productId} />
        </div>
      );
    }
  }

  return <div>{renderProduct()}</div>;
}
