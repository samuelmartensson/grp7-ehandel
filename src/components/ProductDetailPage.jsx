import React, { useContext, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import { useState } from 'react';
import Reviews from './Reviews';

export default function ProductDetailPage() {
  const data = useContext(DataContext);
  const [product, setProduct] = useState('');

  useEffect(() => {
    fetch('https://mock-data-api.firebaseio.com/e-commerce/products/16065.json')
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        console.log(data.images[0].src.medium);
      });
  }, []);

  function renderProduct() {
    if (product == '') {
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
              <img src={product.images[0].src.small} />
            </li>
          </ol>
          <Reviews />
        </div>
      );
    }
  }

  return <div>{renderProduct()}</div>;
}
