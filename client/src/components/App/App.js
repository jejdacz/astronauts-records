import React from "react";
import { Route, Switch } from "react-router-dom";
import AstronautsPage from "../pages/AstronautsPage/AstronautsPage.js";
import NewAstronautPage from "../pages/NewAstronautPage/NewAstronautPage.js";
import AstronautPage from "../pages/AstronautPage/AstronautPage.js";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.js";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" component={AstronautsPage} />
        <Route path="/astronauts/new" component={NewAstronautPage} />
        <Route path="/astronauts/:id" component={AstronautPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
