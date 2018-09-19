import React from "react";
import { shallow } from "enzyme";
import faker from "faker";

const App = () => <h1>{faker.firstName}</h1>;

it("renders without crashing", () => {
  shallow(<App />);
});
