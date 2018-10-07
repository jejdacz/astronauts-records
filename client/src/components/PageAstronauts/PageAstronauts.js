import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadAstronautsIfNeeded } from "../../astronautActions.js";
import AstronautList from "../AstronautList/AstronautList.js";
import { Nav, NavLink, NavLogo, NavButton } from "../Nav/Nav.js";
import styles from "./PageAstronauts.css";

class PageAstronauts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadAstronautsIfNeeded);
  }

  componentWillUnmount() {}

  renderError(error) {
    return <h4>{error.message}</h4>;
  }

  renderLoading() {
    return <h4>loading...</h4>;
  }

  renderContent = content => (
    <Fragment>
      <Nav>
        <NavLogo to="/">AR</NavLogo>
        <NavLink to="/astronauts/new/">+ADD</NavLink>
      </Nav>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.gold} />
          <h1 className={styles.heading}>
            ASTRONAUTS<br />
            <span className={styles.headingSmall}>RECORDS</span>
          </h1>
        </div>
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

export default connect(mapStateToProps)(PageAstronauts);
