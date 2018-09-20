import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers.js";
import App from "./components/App/App.js";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
