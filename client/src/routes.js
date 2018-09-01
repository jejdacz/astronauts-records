import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./components/App.js";
import AstronautsPage from "./pages/AstronautsPage.js";
import NewAstronautPage from "./pages/NewAstronautPage.js";
import AstronautPage from "./pages/AstronautPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";

export default (
  <Route path="/" component={App}>
    <Switch>
      <Route exact={true} path="/" component={AstronautsPage} />
      <Route path="/astronauts/new" component={NewAstronautPage} />
      <Route path="/astronauts/:id" component={AstronautPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Route>
);
