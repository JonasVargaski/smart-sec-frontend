import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "react-toastify/dist/ReactToastify.css";
import "./util/fontAwesomeIcons";

import App from "./routes/AppRoutes";
import Site from "./layouts/Site/Site";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/app*" component={App} />
        <Route exact path="/" component={Site} />
        <Route path="*" component={() => <h1>404 NOT FOUND</h1>} /> */}
      </Switch>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

render();

if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./routes/AppRoutes", () => {
    render();
  });
}

serviceWorker.register();
