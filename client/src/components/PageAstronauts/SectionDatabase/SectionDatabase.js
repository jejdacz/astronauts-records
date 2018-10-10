import React, { Component, Fragment } from "react";
import { Assembly, Paragraph, Button, Group } from "../../Main/Main.js";

const SectionDatabase = ({ children }) => (
  <Assembly heading="DATABASE" id="database">
    <Group>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas
        libero. Integer malesuada. Cum sociis natoque penatibus et magnis dis
        parturient montes.
      </Paragraph>
      <Button>ADD ASTRONAUT</Button>
    </Group>
    <Group>{children}</Group>
  </Assembly>
);

export default SectionDatabase;
