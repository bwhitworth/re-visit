import React from 'react';
import { Link } from 'react-router-dom';

import './SingleTrip.scss';
import tripsData from '../../../helpers/data/tripsData';
import memoriesData from '../../../helpers/data/memoriesData';

import MemoryCard from '../../shared/MemoryCard/MemoryCard';

class SingleTrip extends React.Component {
  state = {
    trip: {},
    memories: [],
  }

  componentDidMount() {
    const { tripId } = this.props.match.params;
    tripsData.getSingleTrip(tripId)
      .then((response) => this.setState({ trip: response.data }))
      .catch((err) => console.error('could not get single trip:', err));
    memoriesData.getMemoriesByTripId(tripId)
      .then((memsArray) => this.setState({ memories: memsArray }))
      .catch((err) => console.error('could not get memories for this trip:', err));
  }

  deleteTripAndMemories = () => {
    const tripForDelete = this.props.match.params.tripId;
    tripsData.deleteTrip(tripForDelete)
      .then(() => {
        memoriesData.deleteMemoriesByTripId(tripForDelete);
        this.props.history.push('/trips');
      })
      .catch((err) => console.error('could not delete trip:', err));
  };

  render() {
    const { trip, memories } = this.state;
    const buildMemories = memories.map((mem) => (
        <MemoryCard key={mem.id} memory={mem}/>
    ));
    const newMemoryLink = '/memories/new';
    const { tripId } = this.props.match.params;
    return (
      <div className="SingleTrip col-12">
      <h3>{trip.name}</h3>
      <div className="container">
        {buildMemories}
        <Link className="btn btn-primary" to={{ pathname: newMemoryLink, tripId }}>New Memory +</Link>
        <button className="btn btn-secondary" onClick={this.deleteTripAndMemories}>Delete This Trip</button>
      </div>
      </div>
    );
  }
}

export default SingleTrip;
