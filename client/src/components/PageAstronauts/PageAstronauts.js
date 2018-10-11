import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadAstronautsIfNeeded } from "../../astronautActions.js";
import AstronautList from "../AstronautList/AstronautList.js";
import Nav from "../Nav/Nav.js";
import Hero from "./Hero/Hero.js";
import SectionDatabase from "./SectionDatabase/SectionDatabase.js";
import widthMonitor from "../widthMonitor/widthMonitor.js";
import breakpoints from "../../styles/breakpoints.css";

class PageAstronauts extends Component {
  constructor(props) {
    super(props);
    this.breakpointMedium = breakpoints["bp-md"].replace("px", "");
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
        <Nav.Bar fixed={true}>
          <Nav.Logo to="/">AR</Nav.Logo>
          <Nav.Link to="/astronauts/new/">Link</Nav.Link>
          <Nav.Button to="/astronauts/new/">+ADD</Nav.Button>
        </Nav.Bar>
        <Hero />
      </header>
      <main>
        {/*/ TODO: move AstronautList to section database.... edit + delete func<<<<======??*/}
        <SectionDatabase>{content}</SectionDatabase>
        <p>
          {this.breakpointMedium <= this.props.innerWidth
            ? "bigger"
            : "smaller"}
        </p>
        <p>{this.props.width}</p>
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

export default connect(mapStateToProps)(widthMonitor()(PageAstronauts));
