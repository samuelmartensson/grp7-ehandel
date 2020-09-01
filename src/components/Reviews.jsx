import React, { useState, useEffect } from 'react';

export default function Reviews({ id }) {
  const [data, setData] = useState({});
  function fetchData() {
    fetch(`https://mock-data-api.firebaseio.com/e-commerce/reviews/${id}.json`)
      .then((res) => res.json())
      .then((items) => {
        setData(items);
        console.log(items);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="reviews">
      <h1 className="reviews__header">Reviews</h1>

      {data &&
        Object.entries(data).map((review, i) => {
          const payload = review[1];
          return (
            <div key={i} className="reviews__item-wrap">
              <div className="reviews__row">
                <div className="reviews__rating">
                  Rating: {payload.rating} / 5
                </div>
                <h3 className="reviews__title">{payload.title}</h3>
              </div>
              <div className="reviews__row">
                <div className="reviews__author">
                  By <span>{payload.author.name}</span> -
                </div>
                <div className="reviews__date">{payload.date}</div>
              </div>

              <p className="reviews__description">{payload.description}</p>
            </div>
          );
        })}
    </div>
  );
}
