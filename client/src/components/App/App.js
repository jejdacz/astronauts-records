import React from "react";
import { Route, Switch } from "react-router-dom";
import PageAstronauts from "../PageAstronauts/PageAstronauts.js";
// import PageNewAstronaut from "../PageNewAstronaut/PageNewAstronaut.js";
// import PageAstronaut from "../PageAstronaut/PageAstronaut.js";
import PageNotFound from "../PageNotFound/PageNotFound.js";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" component={PageAstronauts} />

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;

// <Route path="/astronauts/new" component={PageNewAstronaut} />
// <Route path="/astronauts/:id" component={PageAstronaut} />
