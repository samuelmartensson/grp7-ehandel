import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CartContext } from './context/CartContext';
//components
import ProductsList from './components/ProductsList';
import ProductDetailPage from './components/ProductDetailPage';
import Cart from './components/Cart';
import { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';

function App() {
  const [productIds, setProductIds] = useState([]);

  function handleAddToCart(productId) {
    const isDuplicate = productIds.findIndex(
      (product) => product.id === productId
    );
    if (isDuplicate !== -1) {
      let newArr = [...productIds];
      newArr[isDuplicate].quantity += 1;
      setProductIds(newArr);
    } else {
      setProductIds((prevState) => [
        ...prevState,
        { id: productId, quantity: 1 },
      ]);
    }
  }
  useEffect(() => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      setProductIds(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...productIds]));
  }, [productIds]);

  return (
    <div className="App">
      <CartContext.Provider value={{ handleAddToCart, setProductIds }}>
        <Switch>
          <Route
            path="/products/:id"
            render={(props) => {
              return (
                <LayoutHeader>
                  <ProductDetailPage {...props} />;
                </LayoutHeader>
              );
            }}
          ></Route>
          <Route path="/cart">
            <LayoutHeader>
              <Cart />
            </LayoutHeader>
          </Route>
          <Route path="/">
            <LayoutHeader>
              <ProductsList />
            </LayoutHeader>
          </Route>
        </Switch>
      </CartContext.Provider>
    </div>
  );
}

export default App;
