import { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToHash extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    } else if (this.props.location.key !== prevProps.location.key) {
      if (this.props.location.hash) {
        document.querySelector(this.props.location.hash) &&
          document
            .querySelector(this.props.location.hash)
            .scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToHash);
