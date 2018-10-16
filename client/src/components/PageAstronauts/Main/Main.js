import attachClassName from "../../../utils/attachClassName.js";
import Cont from "../../Container/Container.js";
import styles from "./Main.module.css";

export const Container = attachClassName(styles.container)(Cont);

export const Section = attachClassName(styles.section)("section");

export const SectionSecondary = attachClassName(styles.sectionSecondary)(
  "section"
);

export const Heading = attachClassName(styles.heading)("h2");

export const Group = attachClassName(styles.group)("div");

export const Paragraph = attachClassName(styles.paragraph)("p");

export default {
  Container,
  Section,
  SectionSecondary,
  Heading,
  Group,
  Paragraph
};
