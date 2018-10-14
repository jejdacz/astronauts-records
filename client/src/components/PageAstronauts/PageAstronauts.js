import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadAstronautsIfNeeded } from "../../astronautActions.js";
import AstronautList from "./AstronautList/AstronautList.js";
import AstronautTable from "./AstronautTable/AstronautTable.js";
import Nav from "../Nav/Nav.js";
import Hero from "./Hero/Hero.js";
import SectionDatabase from "./SectionDatabase/SectionDatabase.js";
import widthMonitor from "../widthMonitor/widthMonitor.js";
import breakpoints from "../../styles/breakpoints.module.css";
import styles from "./PageAstronauts.module.css";

class PageAstronauts extends Component {
  constructor(props) {
    super(props);
    this.breakpointLarge = breakpoints["bp-lg"].replace("px", "");
  }

  isLargeScreenDevice() {
    return this.props.width >= this.breakpointLarge;
  }

  componentDidMount() {
    //this.props.dispatch(loadAstronautsIfNeeded);
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
          <Nav.Logo to="/">ar</Nav.Logo>
          <Nav.Link to="/astronauts/new/">link</Nav.Link>
          <Nav.Button onClick={() => false}>+add</Nav.Button>
        </Nav.Bar>
        <Hero />
      </header>
      <main>
        <SectionDatabase>{content}</SectionDatabase>
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
    if (this.isLargeScreenDevice()) {
      return this.renderContent(
        <AstronautTable
          astronauts={items}
          updated={this.props.receivedAt}
          onDeleteClick={() => false}
        />
      );
    } else {
      return this.renderContent(
        <AstronautList astronauts={items} updated={this.props.receivedAt} />
      );
    }
  }
}

const mapStateToProps = state => ({ ...state.astronauts });

export default connect(mapStateToProps)(widthMonitor()(PageAstronauts));
