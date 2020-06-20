import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.scss';

import Auth from '../components/pages/Auth/Auth';
import ThisNavbar from '../components/shared/ThisNavbar/ThisNavbar';

import fbConnection from '../helpers/data/connection';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className="App">
        <ThisNavbar />
        <Auth />
      </div>
    );
  }
}

export default App;
