import Container from "../Container/Container";
import withClassName from "../withClassName/withClassName";
import styles from "./Panel.module.css";

const Panel = withClassName(styles.container)(Container);
export default Panel;
