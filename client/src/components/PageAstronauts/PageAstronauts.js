import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAstronaut, clearChangedAction } from "../../astronautActions.js";
import AstronautList from "./AstronautList/AstronautList.js";
import AstronautTable from "./AstronautTable/AstronautTable.js";
import { Link } from "../Nav/Nav.js";
import NavigationBar from "../NavigationBar/NavigationBar.js";
import Hero from "./Hero/Hero.js";
import SectionDatabase from "./SectionDatabase/SectionDatabase.js";
import Footer from "../Footer/Footer.js";
import widthMonitor from "../widthMonitor/widthMonitor.js";
import breakpoints from "../../styles/breakpoints.module.css";
import styles from "./PageAstronauts.module.css";

export class PageAstronauts extends Component {
  constructor(props) {
    super(props);

    this.breakpointLarge = breakpoints["bp-lg"].replace("px", "");
    this.handleDelete = this.handleDelete.bind(this);
  }

  static propTypes = {
    pending: PropTypes.bool,
    changed: PropTypes.bool,
    lastUpdated: PropTypes.number.isRequired,
    astronauts: PropTypes.array.isRequired,
    deleteAstronaut: PropTypes.func.isRequired,
    clearChanged: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    if (this.props.changed) {
      this.props.clearChanged();
    }
  }

  isLargeScreenDevice() {
    return this.props.width >= this.breakpointLarge;
  }

  handleDelete(id) {
    if (!this.props.pending) {
      this.props.deleteAstronaut(id);
    }
  }

  renderContent = content => (
    <Fragment>
      <header className={styles.header}>
        <NavigationBar links={<Link to="/astronauts/new/">+add</Link>} />
        <Hero />
      </header>
      <main>
        <SectionDatabase>{content}</SectionDatabase>
      </main>
      <Footer />
    </Fragment>
  );

  render() {
    const { pending, astronauts, lastUpdated } = this.props;

    if (astronauts.length === 0) {
      if (pending) {
        return this.renderContent(null);
      }
      return this.renderContent("No records");
    }
    if (this.isLargeScreenDevice()) {
      return this.renderContent(
        <AstronautTable
          astronauts={astronauts}
          updated={lastUpdated}
          onDeleteClick={this.handleDelete}
        />
      );
    }
    return this.renderContent(
      <AstronautList astronauts={astronauts} updated={lastUpdated} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  clearChanged: () => dispatch(clearChangedAction()),
  deleteAstronaut: id => dispatch(deleteAstronaut({ id }))
});

const mapStateToProps = state => ({
  pending: state.pending,
  changed: state.changed,
  astronauts: state.astronauts.allIds.map(id => state.astronauts.byId[id]),
  lastUpdated: state.lastUpdated
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(widthMonitor()(PageAstronauts));
