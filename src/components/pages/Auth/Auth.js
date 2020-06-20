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
        <h1>Auth Component</h1>
        <button className="btn btn-primary" onClick={this.logUserIn}>Google Login</button>
      </div>
    );
  }
}

export default Auth;
