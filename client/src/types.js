import { shape, string } from "prop-types";

export const astronautType = shape({
  id: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  birth: string.isRequired,
  superpower: string.isRequired
});
