import React from 'react';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';

import TripCard from '../../shared/TripCard/TripCard';

import './Trips.scss';

class Trips extends React.Component {
  state = {
    trips: [],
  }

  getTrips = () => {
    const uid = authData.getUid();
    tripsData.getTripsByUid(uid)
      .then((trips) => this.setState({ trips }))
      .catch((err) => console.error('could not get trips', err));
  };

  componentDidMount() {
    this.getTrips();
  }

  render() {
    const { trips } = this.state;
    const buildTrips = trips.map((trip) => (
      <TripCard key={trip.id} trip={trip}/>
    ));
    return (
      <div className="Trips col-12">
      <h3>My Trips</h3>
      <div className="d-flex flex-wrap col-12">
        {buildTrips}
      </div>
      </div>
    );
  }
}

export default Trips;
