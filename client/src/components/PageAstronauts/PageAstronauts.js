import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadAstronautsIfNeeded } from "../../astronautActions.js";
import AstronautList from "./AstronautList/AstronautList.js";
import AstronautTable from "./AstronautTable/AstronautTable.js";
import { Nav, Link, Logo } from "../Nav/Nav.js";
import Hero from "./Hero/Hero.js";
import SectionDatabase from "./SectionDatabase/SectionDatabase.js";
import Footer from "../Footer/Footer.js";
import DeleteAstronautDialog from "../DeleteAstronautDialog/DeleteAstronautDialog.js";
import Spinner from "../Spinner/Spinner.js";
import widthMonitor from "../widthMonitor/widthMonitor.js";
import breakpoints from "../../styles/breakpoints.module.css";
import styles from "./PageAstronauts.module.css";

class PageAstronauts extends Component {
  constructor(props) {
    super(props);

    this.breakpointLarge = breakpoints["bp-lg"].replace("px", "");

    this.state = {
      deleteDialogIsOpen: false,
      astronautToDelete: {}
    };

    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    receivedAt: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired
  };

  openDeleteDialog(index) {
    this.setState({
      deleteDialogIsOpen: true,
      astronautToDelete: this.props.items[index]
    });
  }

  closeDeleteDialog() {
    this.setState({ deleteDialogIsOpen: false, astronautToDelete: {} });
  }

  isLargeScreenDevice() {
    return this.props.width >= this.breakpointLarge;
  }

  componentDidMount() {
    this.props.dispatch(loadAstronautsIfNeeded);
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
      {this.state.deleteDialogIsOpen && (
        <DeleteAstronautDialog
          isOpen={this.state.deleteDialogIsOpen}
          closeModal={this.closeDeleteDialog}
          astronaut={this.state.astronautToDelete}
        />
      )}
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
          onDeleteClick={this.openDeleteDialog}
        />
      );
    }
    return this.renderContent(
      <AstronautList astronauts={items} updated={this.props.receivedAt} />
    );
  }
}

const mapStateToProps = state => ({ ...state.astronauts });

export default connect(mapStateToProps)(widthMonitor()(PageAstronauts));
