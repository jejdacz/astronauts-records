import React, { Component } from "react";

const widthMonitor = (propName = "width") => BaseComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        width: window.innerWidth
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
      this.setState({ width: window.innerWidth });
    }

    componentDidMount() {
      window.addEventListener("load", this.updateDimensions);
      window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
      window.removeEventListener("load", this.updateDimensions);
    }

    render() {
      const props = { ...this.props, [propName]: this.state.width };
      return <BaseComponent {...props} />;
    }
  };

export default widthMonitor;
