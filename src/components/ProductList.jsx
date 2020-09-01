import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

export default function ProductList() {
  const data = useContext(DataContext);

  return (
    <div>
      {data.products &&
        Object.entries(data.products).map((item) => {
          const key = item[0];
          const payload = item[1];

          return <div key={key}>{payload.name}</div>;
        })}
    </div>
  );
}
