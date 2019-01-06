import React from "react";
import Container from "../Container/Container.js";
import styles from "./Footer.module.css";
import LinkButton from "../LinkButton/LinkButton.js";

const Footer = () => (
  <Container fluid={true} as="footer" className={styles.footer}>
    <Container className={styles.container}>
      <div className={styles.copy}>&copy;2018 Marek Mego</div>
      <div>
        <LinkButton
          className={styles.link}
          href="https://github.com/jejdacz/astronauts-records"
        >
          source on Github
        </LinkButton>

        <LinkButton className={styles.link} href="/demo/index.html">
          app specs
        </LinkButton>
      </div>
    </Container>
  </Container>
);

export default Footer;
