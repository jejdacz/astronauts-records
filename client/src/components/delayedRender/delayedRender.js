import React, { Component } from "react";
import PropTypes from "prop-types";

const delayedRender = ms => BaseComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { countdown: false, render: false };
    }

    static defaultProps = {
      shouldRender: true
    };

    static propTypes = {
      shouldRender: PropTypes.bool
    };

    componentDidMount() {
      if (this.props.shouldRender) {
        this.startCountdown();
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.shouldRender !== this.props.shouldRender) {
        if (this.props.shouldRender) {
          // On open
          this.startCountdown();
        } else {
          // On close
          if (this.state.countdown) {
            this.stopCountdown();
          } else {
            this.setState({ render: false });
          }
        }
      }
    }

    componentWillUnmount() {
      if (this.state.countdown) this.stopCountdown();
    }

    startCountdown() {
      this.timer = setTimeout(
        () => this.setState({ render: true, countdown: false }),
        ms
      );
      this.setState({ countdown: true });
    }

    stopCountdown() {
      clearTimeout(this.timer);
      this.setState({ countdown: false });
    }

    render() {
      const { shouldRender, ...props } = this.props;
      return this.state.render && <BaseComponent {...props} />;
    }
  };

export default delayedRender;
