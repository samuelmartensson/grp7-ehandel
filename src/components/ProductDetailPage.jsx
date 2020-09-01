import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { useState } from 'react';

export default function ProductDetailPage() {
  const data = useContext(DataContext);
  const [product, setProduct] = useState();

  function handleClick() {
    const one = Object.entries(data)[2];
    setProduct(Object.values(one[1])[7].description);
  }

  return <div onClick={handleClick}>Klick: {product}</div>;
}
