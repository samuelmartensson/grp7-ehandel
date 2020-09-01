import React from 'react';
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
    setProductIds((prevState) => [...prevState, productId]);
    localStorage.setItem('cart', JSON.stringify([...productIds, productId]));
  }

  return (
    <div className="App">
      <CartContext.Provider
        value={{ productIds, setProductIds, handleAddToCart }}
      >
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
