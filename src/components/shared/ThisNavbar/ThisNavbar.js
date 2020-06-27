import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './ThisNavbar.scss';

class ThisNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  logUserOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  logUserIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const buildNavbar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/trips'><i className="far fa-compass"></i> Trips</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/trips/new'><i className="fas fa-map-pin"></i> New Trip</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.logUserOut}><i class="fas fa-sign-out-alt"></i> Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink onClick={this.logUserIn}><i class="fas fa-sign-in-alt"></i> Login</NavLink>
          </NavItem>
      </Nav>
      );
    };
    return (
      <div className="ThisNavbar">
       <Navbar className="navbar-custom" expand="sm">
         <NavbarBrand href="/">RE:visit</NavbarBrand>
        <NavbarToggler className="navbar-dark" onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
        {buildNavbar()}
        </Collapse>
       </Navbar>
      </div>
    );
  }
}

export default ThisNavbar;
