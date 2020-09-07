import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CartContext } from './context/CartContext';
//components
import ProductsList from './components/ProductsList';
import ProductDetailPage from './components/ProductDetailPage';
import Cart from './components/Cart';
import { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import Order from './components/Order';
import CartAsync from './components/CartAsync';
import LayoutNav from './components/LayoutNav';
import Footer from './components/Footer';

function App() {
  const [productIds, setProductIds] = useState([]);

  function handleAddToCart(productId, stock) {
    const index = productIds.findIndex(
      (product) => product.id === parseInt(productId)
    );
    if (index !== -1) {
      // Duplicate
      let newArr = [...productIds];
      if (stock > newArr[index].quantity) {
        newArr[index].quantity += 1;
        setProductIds(newArr);
      } else {
        alert('No more available in stock');
      }
    } else {
      // New Item
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
      <CartContext.Provider
        value={{ handleAddToCart, setProductIds, productIds }}
      >
        <Switch>
          <Route
            path="/products/:id"
            render={(props) => {
              return (
                <LayoutNav>
                  <ProductDetailPage {...props} />;
                  <CartAsync />
                </LayoutNav>
              );
            }}
          ></Route>
          <Route path="/cart">
            <LayoutNav>
              <Cart />
            </LayoutNav>
          </Route>
          <Route
            path="/order"
            render={(props) => {
              return (
                <LayoutHeader>
                  <Order {...props} />
                </LayoutHeader>
              );
            }}
          ></Route>
          <Route path="/">
            <section className="startpage">
              <LayoutHeader>
                <CartAsync />
                <ProductsList />
              </LayoutHeader>
            </section>
          </Route>
        </Switch>
      </CartContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
