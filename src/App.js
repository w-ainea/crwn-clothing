import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";

function App() {
  return (
    <div className="App">
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
