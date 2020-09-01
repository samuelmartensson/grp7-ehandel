import React from "react";
import { Switch, Route } from "react-router-dom";

//components
import ProductsList from "./components/ProductsList";
import ProductDetailPage from "./components/ProductsList";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/products/:id"
          render={(props) => {
            return <ProductDetailPage {...props} />;
          }}
        ></Route>
        <Route path="/">
          <ProductsList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
