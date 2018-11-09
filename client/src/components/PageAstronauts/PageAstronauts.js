import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loadAstronautsIfNeeded,
  resetAstronautAction
} from "../../astronautActions.js";
import {
  openDeleteDialogAction,
  closeDeleteDialogAction
} from "../../deleteDialogActions";
import AstronautList from "./AstronautList/AstronautList.js";
import AstronautTable from "./AstronautTable/AstronautTable.js";
import { Nav, Link, Logo } from "../Nav/Nav.js";
import Hero from "./Hero/Hero.js";
import SectionDatabase from "./SectionDatabase/SectionDatabase.js";
import Footer from "../Footer/Footer.js";
import Spinner from "../Spinner/Spinner.js";
import widthMonitor from "../widthMonitor/widthMonitor.js";
import breakpoints from "../../styles/breakpoints.module.css";
import styles from "./PageAstronauts.module.css";

class PageAstronauts extends Component {
  constructor(props) {
    super(props);

    this.breakpointLarge = breakpoints["bp-lg"].replace("px", "");
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    receivedAt: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired
  };

  isLargeScreenDevice() {
    return this.props.width >= this.breakpointLarge;
  }

  handleDeleteClick(astronaut) {
    this.props.dispatch(openDeleteDialogAction(astronaut));
  }

  componentDidMount() {
    this.props.dispatch(loadAstronautsIfNeeded);
  }

  componentDidUpdate() {
    if (this.props.shouldRefresh) {
      this.props.dispatch(loadAstronautsIfNeeded);
    }

    if (this.props.deleteAstronaut && this.props.deleteAstronaut.success) {
      this.props.dispatch(closeDeleteDialogAction());
      this.props.dispatch(resetAstronautAction());
    }
  }

  renderContent = content => (
    <Fragment>
      <header className={styles.header}>
        <Nav fixed={true}>
          <Logo to="/">ar</Logo>
          <Link to="/astronauts/new/">+add</Link>
        </Nav>
        <Hero />
      </header>
      <main>
        <SectionDatabase>{content}</SectionDatabase>
      </main>
      <Footer />
    </Fragment>
  );

  render() {
    const { loading, error, items } = this.props;

    if (error) {
      return this.renderContent("Error: Loading of records failed!");
    }
    if (loading) {
      return this.renderContent(<Spinner center={true} />);
    }
    if (items.length === 0) {
      return this.renderContent("No records");
    }
    if (this.isLargeScreenDevice()) {
      return this.renderContent(
        <AstronautTable
          astronauts={items}
          updated={this.props.receivedAt}
          onDeleteClick={this.handleDeleteClick}
        />
      );
    }
    return this.renderContent(
      <AstronautList astronauts={items} updated={this.props.receivedAt} />
    );
  }
}

const mapStateToProps = state => ({
  ...state.astronauts,
  deleteAstronaut: state.deleteAstronaut
});

export default connect(mapStateToProps)(widthMonitor()(PageAstronauts));
