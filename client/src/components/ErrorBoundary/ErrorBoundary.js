import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static propTypes = {
    render: PropTypes.node.isRequired
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.render;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
