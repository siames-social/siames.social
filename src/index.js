import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import Index from "views/Index.jsx";
import LandingPage from "views/examples/LandingPage.jsx";
import RegisterPage from "views/examples/RegisterPage.jsx";
import ContactPage from "views/examples/ContactPage.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components" render={props => <Index {...props} />} />
      <Route
        path="/landing-page"
        render={props => <LandingPage {...props} />}
      />
      <Route
        path="/register"
        render={props => <RegisterPage {...props} />}
      />
      <Route
        path="/contact"
        render={props => <ContactPage {...props} />}
      />
      <Redirect from="/" to="/landing-page" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
