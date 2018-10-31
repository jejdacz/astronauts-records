import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import PageAstronauts from "../PageAstronauts/PageAstronauts.js";
import PageNewAstronaut from "../PageNewAstronaut/PageNewAstronaut.js";
import PageAstronaut from "../PageAstronaut/PageAstronaut.js";
import PageNotFound from "../PageNotFound/PageNotFound.js";
import DeleteAstronautDialog from "../DeleteAstronautDialog/DeleteAstronautDialog.js";

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact={true} path="/" component={PageAstronauts} />
        <Route path="/astronauts/new" component={PageNewAstronaut} />
        <Route path="/astronauts/:id" component={PageAstronaut} />
        <Route component={PageNotFound} />
      </Switch>
      <DeleteAstronautDialog />
    </Fragment>
  );
};

export default App;
