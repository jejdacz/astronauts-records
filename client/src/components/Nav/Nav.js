import React, { Fragment } from "react";
import PropTypes from "prop-types";
import join from "../../utils/join.js";
import withClassName from "../withClassName/withClassName.js";
import LinkButton from "../LinkButton/LinkButton.js";
import Container from "../Container/Container.js";
import styles from "./Nav.module.css";
import { lifecycle } from "recompose";

export const NavBase = ({ children, className, fixed, ...props }) => (
  <Fragment>
    <Container
      fluid={true}
      as={"nav"}
      className={join(styles.nav, fixed ? styles.navFixed : "", className)}
      {...props}
    >
      <Container className={styles.container}>{children}</Container>
    </Container>
    <div className={styles.placeholder} />
  </Fragment>
);

NavBase.propTypes = {
  children: PropTypes.node,
  fixed: PropTypes.bool,
  className: PropTypes.string
};

export const Nav = lifecycle({
  componentDidMount() {
    window.addEventListener(
      "scroll",
      hideOnScrollDown(isScrollingDown(window.scrollY))
    );
  },
  componentWillUnmount() {
    window.removeEventListener(
      "scroll",
      hideOnScrollDown(isScrollingDown(window.scrollY))
    );
  }
})(NavBase);

const isScrollingDown = init => {
  let prev = init;
  return () => {
    const val = window.scrollY > prev;
    prev = window.scrollY;
    return val;
  };
};

const hideOnScrollDown = isScrollingDown => () => {
  const classNames = styles.navHiden.split(" ");
  const element = document.querySelector(`.${styles.nav.split(" ")[0]}`);

  if (element) {
    if (isScrollingDown()) {
      classNames.map(c => element.classList.add(c));
    } else {
      classNames.map(c => element.classList.remove(c));
    }
  }
};

export const Link = withClassName(styles.link)(LinkButton);
export const Logo = withClassName(styles.logo)(LinkButton);

export default {
  Nav,
  Link,
  Logo
};
