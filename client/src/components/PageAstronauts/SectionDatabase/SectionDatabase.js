import React from "react";
import styles from "./SectionDatabase.module.css";

const SectionDatabase = ({ children }) => (
  <section id="database" className={styles.section}>
    <div className={styles.container}>
      <h2 className={styles.heading}>DATABASE</h2>
      <div className={styles.group}>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas
          libero. Integer malesuada. Cum sociis natoque penatibus et magnis dis
          parturient montes.
        </p>
        <button className={styles.button}>ADD ASTRONAUT</button>
      </div>
      {children}
    </div>
  </section>
);

export default SectionDatabase;
