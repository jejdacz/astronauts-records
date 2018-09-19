import PropTypes from "prop-types";
import { getContext } from "recompose";

const contextConsumer = getContext({ formContext: PropTypes.object });

export default contextConsumer;
