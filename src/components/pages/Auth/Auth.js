import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  logUserIn = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <h1>RE:visit</h1>
        <h2 className="font-marker font-cyan">Your travel scrapbook</h2>
        <h4 className="font-bubblegum">RE:visit is designed for capturing special memories from vacations, adventures, and trips.</h4>
        <h4 className="font-bubblegum">Use the Login button below to get started</h4>
        <button className="btn custom-button-acid" onClick={this.logUserIn}>Login with Google</button>
      </div>
    );
  }
}

export default Auth;
