import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./styles/globals.css"; // Import Tailwind CSS

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
