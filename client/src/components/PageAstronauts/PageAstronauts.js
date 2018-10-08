import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadAstronautsIfNeeded } from "../../astronautActions.js";
import AstronautList from "../AstronautList/AstronautList.js";
import { Nav, NavLink, NavLogo, NavButton } from "../Nav/Nav.js";
import Hero from "./Hero/Hero.js";
import styles from "./PageAstronauts.module.css";

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
      <header>
        <Nav>
          <NavLogo to="/">AR</NavLogo>
          <NavLink to="/astronauts/new/">+ADD</NavLink>
          <NavLink to="/astronauts/new/">+ADD</NavLink>
        </Nav>
        <Hero />
      </header>
      <main>
        <section id="database" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.heading}>DATABASE</h2>
            <div className={styles.group}>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Maecenas libero. Integer malesuada. Cum sociis natoque penatibus
                et magnis dis parturient montes.
              </p>
              <button className={styles.button}>ADD ASTRONAUT</button>
            </div>
            {content}
          </div>
        </section>
      </main>
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
