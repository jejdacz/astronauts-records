import React from "react";
import { mount } from "enzyme";
import styles from "./try.css";

const Sample = props => <div {...props} />;

describe("CSS modules test", () => {
  it("should render without crashing", () => {
    let wrapper = mount(<Sample className={styles.redBorder} />);
    console.log(wrapper.html());
  });
});
