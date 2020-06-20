import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './ThisNavbar.scss';

class ThisNavbar extends React.Component {
  logUserOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="ThisNavbar">
        <h1>Navbar goes here</h1>
        <button className="btn btn-secondary" onClick={this.logUserOut}>Logout</button>
      </div>
    );
  }
}

export default ThisNavbar;
