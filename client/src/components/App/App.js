import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import PageAstronauts from "../PageAstronauts/PageAstronauts.js";
import PageNewAstronaut from "../PageNewAstronaut/PageNewAstronaut.js";
import PageEditAstronaut from "../PageEditAstronaut/PageEditAstronaut.js";
import PageAstronaut from "../PageAstronaut/PageAstronaut.js";
import PageNotFound from "../PageNotFound/PageNotFound.js";
import DeleteAstronautDialog from "../DeleteAstronautDialog/DeleteAstronautDialog.js";

const App = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact={true} path="/" component={PageAstronauts} />
        <Route
          exact={true}
          path="/astronauts/new"
          component={PageNewAstronaut}
        />
        <Route exact={true} path="/astronauts/:id" component={PageAstronaut} />
        <Route
          path="/astronauts/edit/:id"
          render={props => <PageEditAstronaut {...props} editing={true} />}
        />
        <Route component={PageNotFound} />
      </Switch>
      <DeleteAstronautDialog />
    </Fragment>
  );
};

export default App;
