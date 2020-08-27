import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else setCurrentUser({ userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    // const { currentUser } = this.state;
    return (
      <div className="App">
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/signin" component={SignInAndSignUpPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

// dispatch an action to the store
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
