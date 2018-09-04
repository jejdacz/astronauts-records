import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadAstronautsIfNeeded } from "../astronautActions.js";
import AstronautList from "../components/AstronautList.js";

class AstronautsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("componentDidmount");
    this.props.dispatch(loadAstronautsIfNeeded);
  }

  componentWillUnmount() {
    console.log("componentWillunmount");
  }

  renderError(error) {
    return <h4>{error.message}</h4>;
  }

  renderLoading() {
    return <h4>loading...</h4>;
  }

  renderContent = content => (
    <Fragment>
      <header>
        <Link className="btn bg-nav rnd large" to="/astronauts/new">
          +
        </Link>
        <h1 className="title">Evidence kosmonautu</h1>
        <p>
          Culpa labore Lorem mollit aliqua in labore dolore smod veniam nostrud
          aliqua labore incididunt consectetur nostrud minim. Adipisicing et
          esse reprehenderit fugiat commodo cillum duis reprehenderit aliqua qui
          commodos.
        </p>
      </header>
      <main>{content}</main>
    </Fragment>
  );

  render() {
    const { loading, error, items } = this.props;

    if (error) {
      return this.renderContent(this.renderError(error));
    }
    if (loading) {
      return this.renderContent(this.renderLoading());
    }

    return this.renderContent(<AstronautList astronauts={items} />);
  }
}

const mapStateToProps = state => ({ ...state.astronauts });

export default connect(mapStateToProps)(AstronautsPage);
