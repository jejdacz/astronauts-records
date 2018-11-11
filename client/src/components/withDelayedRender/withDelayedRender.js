import React, { Component } from "react";

const withDelayedRender = ms => BaseComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { render: false };
    }

    componentDidUpdate() {
      console.log("update");
      if (this.props.isOpen && !this.state.render) {
        setTimeout(() => this.setState({ render: true }), ms);
      }
      if (this.props.isClose) {
        this.setState({ render: false });
      }
    }

    render() {
      console.log("render");
      return this.state.render && <BaseComponent {...this.props} />;
    }
  };

export default withDelayedRender;
