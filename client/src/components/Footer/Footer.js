import React from "react";
import Container from "../Container/Container.js";
import styles from "./Footer.module.css";

const Footer = () => (
  <Container fluid={true} as="footer" className={styles.footer}>
    <Container className={styles.container}>&copy;2018 Marek Mego</Container>
  </Container>
);

export default Footer;
