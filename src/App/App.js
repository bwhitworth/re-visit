import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.scss';

import ThisNavbar from '../components/shared/ThisNavbar/ThisNavbar';

import Auth from '../components/pages/Auth/Auth';
import EditMemory from '../components/pages/EditMemory/EditMemory';
import EditTrip from '../components/pages/EditTrip/EditTrip';
import NewMemory from '../components/pages/NewMemory/NewMemory';
import NewTrip from '../components/pages/NewTrip/NewTrip';
import SingleMemory from '../components/pages/SingleMemory/SingleMemory';
import SingleTrip from '../components/pages/SingleTrip/SingleTrip';
import Trips from '../components/pages/Trips/Trips';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

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
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <ThisNavbar authed={authed}/>
            <div className="container col-12">
              <div className="col-12">
              <Switch>
                <PrivateRoute path='/trips/edit/:tripId' component={EditTrip} authed={authed} />
                <PrivateRoute path='/trips/new' component={NewTrip} authed={authed} />
                <PrivateRoute path='/trips/:tripId' component={SingleTrip} authed={authed} />
                <PrivateRoute path='/trips' component={Trips} authed={authed} />
                <PrivateRoute path='/memories/new' component={NewMemory} authed={authed} />
                <PrivateRoute path='/memories/edit/:memoryId' component={EditMemory} authed={authed} />
                <PrivateRoute path='/memories/:memoryId' component={SingleMemory} authed={authed} />

                <PublicRoute path='/auth' component={Auth} authed={authed} />
                <Redirect from="*" to="/trips"/>
              </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
