import React, { Fragment } from "react";
import PropTypes from "prop-types";
import join from "../../utils/join.js";
import withClassName from "../withClassName/withClassName.js";
import LinkButton from "../LinkButton/LinkButton.js";
import Container from "../Container/Container.js";
import styles from "./Nav.module.css";

export const Nav = ({ children, className, fixed, ...props }) => (
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

Nav.propTypes = {
  children: PropTypes.node,
  fixed: PropTypes.bool,
  className: PropTypes.string
};

export const Link = withClassName(styles.link)(LinkButton);
export const Logo = withClassName(styles.logo)(LinkButton);

export default {
  Nav,
  Link,
  Logo
};
