import React, { Fragment } from "react";
import { joinToStringBySpace as jstr } from "../../utils/joinToString.js";
import attachClassName from "../../utils/attachClassName.js";
import LinkButton from "../LinkButton/LinkButton.js";
import Container from "../Container/Container.js";
import styles from "./Nav.module.css";

export const Nav = ({ children, className, fixed, ...props }) => (
  <Fragment>
    <Container
      fluid={true}
      as={"nav"}
      className={jstr(styles.nav, fixed ? styles.navFixed : "", className)}
      {...props}
    >
      <Container className={styles.container}>{children}</Container>
    </Container>
    <div className={styles.placeholder} />
  </Fragment>
);

export const Link = attachClassName(styles.link)(LinkButton);
export const Logo = attachClassName(styles.logo)(LinkButton);

export default {
  Nav,
  Link,
  Logo
};
