import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import AuthLayout from "layouts/Auth.js";
import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import { store } from './stores/';
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
      <Route path="/rtl" component={RtlLayout} />
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Redirect from="/" to="/auth/login-page" />
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
