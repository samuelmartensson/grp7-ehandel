import React, { useState } from 'react';

export default function Order(props) {
  const [products, setProducts] = useState(props.location.products);
  return (
    <div className="order">
      <h1>Thanks for ordering!</h1>
      {products
        ? Object.entries(products).map((product) => {
            const key = product[0];
            const payload = product[1].item;
            return (
              <div key={key} className="order__wrap">
                <div className="order__img-wrap">
                  <img
                    className="order__img"
                    src={payload.images[0].src.small}
                  />
                </div>
                <div className="order__info-wrap">
                  <div className="order__product">
                    {product[1].quantity} - {payload.name}(s)
                  </div>
                  <span className="order__price">{payload.price} kr</span>
                </div>
              </div>
            );
          })
        : (window.location.href = '/')}
      <div>Total: {props.location.total} kr</div>
    </div>
  );
}
