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
import DeleteAstronautModal from "../DeleteAstronautModal/DeleteAstronautModal.js";
import Spinner from "../Spinner/Spinner.js";
import widthMonitor from "../widthMonitor/widthMonitor.js";
import breakpoints from "../../styles/breakpoints.module.css";
import styles from "./PageAstronauts.module.css";

class PageAstronauts extends Component {
  constructor(props) {
    super(props);

    this.breakpointLarge = breakpoints["bp-lg"].replace("px", "");

    this.state = {
      deleteModalIsOpen: false,
      idToDelete: null
    };

    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    receivedAt: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired
  };

  openDeleteModal(id) {
    this.setState({ deleteModalIsOpen: true, idToDelete: id });
  }

  closeDeleteModal() {
    this.setState({ deleteModalIsOpen: false, idToDelete: null });
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
      {this.state.deleteModalIsOpen && (
        <DeleteAstronautModal
          isOpen={this.state.deleteModalIsOpen}
          closeModal={this.closeDeleteModal}
          idToDelete={this.state.idToDelete}
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
          onDeleteClick={this.openDeleteModal}
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
