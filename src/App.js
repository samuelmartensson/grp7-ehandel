import React, { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import { DataContext } from './contexts/DataContext';
import ProductDetailPage from './components/ProductDetailPage';

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch('https://mock-data-api.firebaseio.com/e-commerce/.json')
      .then((res) => res.json())
      .then((items) => {
        setData(items);
      });
  }, []);

  return (
    <div className="App">
      <DataContext.Provider value={data}>
        <ProductList />
        <ProductDetailPage />
      </DataContext.Provider>
    </div>
  );
}

export default App;
