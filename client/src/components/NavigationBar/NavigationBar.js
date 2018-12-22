import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../astronautActions.js";
import LogOut from "../LogOut/LogOut";
import { Nav, Logo, Link } from "../Nav/Nav";

export const NavigationBar = ({ isAuthorized, links, logout }) => (
  <Nav fixed={true}>
    <Logo to="/">ar</Logo>
    {links}
    {isAuthorized && (
      <Link onClick={logout}>
        <LogOut />
      </Link>
    )}
  </Nav>
);

NavigationBar.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  links: PropTypes.node,
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = (state, props) => ({
  isAuthorized: state.isAuthorized
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);
