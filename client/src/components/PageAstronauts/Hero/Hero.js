import React from "react";
import styles from "./Hero.module.css";
import Container from "../../Container/Container.js";

const Hero = () => (
  <div className={styles.hero}>
    <Container className={styles.container}>
      <div className={styles.gold} />
      <h1 className={styles.heading}>
        ASTRONAUTS
        <br />
        <span className={styles.headingSmall}>RECORDS</span>
      </h1>
    </Container>
  </div>
);

export default Hero;
