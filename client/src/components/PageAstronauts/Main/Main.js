import withClassName from "../../withClassName/withClassName.js";
import Cont from "../../Container/Container.js";
import Btn from "../../Button/Button.js";
import styles from "./Main.module.css";

export const Container = withClassName(styles.container)(Cont);

export const Section = withClassName(styles.section)("section");

export const SectionSecondary = withClassName(styles.sectionSecondary)(
  "section"
);

export const Heading = withClassName(styles.heading)("h2");

export const Group = withClassName(styles.group)("div");

export const Paragraph = withClassName(styles.paragraph)("p");

export const Button = withClassName(styles.button)(Btn);

export default {
  Container,
  Section,
  SectionSecondary,
  Heading,
  Group,
  Paragraph,
  Button
};
