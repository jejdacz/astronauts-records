import React from "react";
import styles from "./Hero.module.css";

const Hero = props => (
  <div className={styles.hero}>
    <div className={styles.container}>
      <div className={styles.gold} />
      <h1 className={styles.heading}>
        ASTRONAUTS
        <br />
        <span className={styles.headingSmall}>RECORDS</span>
      </h1>
    </div>
  </div>
);

export default Hero;
