import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "../layouts/Dashboard/Dashboard";
import Login from "../layouts/Login/Login";
import { ToastContainer } from "react-toastify";
import componentRoutes from "./dashboardRoutes";

import { Provider } from "react-redux";
import store from "../store/store";

const isAuthenticated = () => {
  let state = store.getState();
  return componentRoutes.some(code => state.usuario.acesso.includes(code.code) && state.autenticado);
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/app/login" />
        // <Redirect to={{ pathname: "/app/login", state: { from: props.location } }} />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer />
        <Provider store={store}>
          <Switch>
            <Route path="/app/login" component={Login} />
            <PrivateRoute path="/app" component={Dashboard} />
          </Switch>
        </Provider>
      </div>
    );
  }
}

export default App;
