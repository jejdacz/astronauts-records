import React, { Component } from "react";

const withDelayedRender = ms => BaseComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { render: false };
    }

    componentDidMount() {
      setTimeout(() => this.setState({ render: true }), ms);
    }

    render() {
      return this.state.render && <BaseComponent {...this.props} />;
    }
  };

export default withDelayedRender;
