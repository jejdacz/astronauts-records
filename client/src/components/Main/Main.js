import React from "react";
import { glueSpace as gs } from "../../utils/glue.js";
import attachClassName from "../../utils/attachClassName.js";
import styles from "./Main.module.css";

export const Container = attachClassName(styles.container)("div");

export const Section = attachClassName(styles.section)("section");

export const Heading = attachClassName(styles.heading)("h2");

export const Group = attachClassName(styles.group)("div");

export const Paragraph = attachClassName(styles.paragraph)("p");

export const Button = attachClassName(styles.button)("button");

export const Assembly = ({ heading, children, ...props }) => (
  <Section {...props}>
    <Container>
      {heading && <Heading>{heading}</Heading>}
      {children}
    </Container>
  </Section>
);

export default {
  Container,
  Section,
  Heading,
  Group,
  Paragraph,
  Button,
  Assembly
};
