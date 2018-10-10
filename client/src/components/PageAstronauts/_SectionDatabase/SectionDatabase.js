import React from "react";
import styles from "./SectionDatabase.module.css";
import { glueSpace as gs } from "../../../utils/glue.js";

const addClass = styleClass => BaseComponent => ({ className, ...props }) =>
  React.createElement(BaseComponent, {
    ...props,
    className: gs(styleClass, className)
  });

const Heading = addClass(styles.heading)("h2");

const SectionDatabase = ({ children }) => (
  <section id="database" className={styles.section}>
    <div className={styles.container}>
      <Heading>DATABASE</Heading>
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

// <h2 className={styles.heading}>DATABASE</h2>

export default SectionDatabase;
