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
    const { tripId } = this.props.match.params;
    const buildMemories = memories.map((mem) => (
        <MemoryCard key={mem.id} memory={mem}/>
    ));
    const newMemoryLink = '/memories/new';
    const editTripLink = `/trips/edit/${tripId}`;
    return (
      <div className="SingleTrip col-12">
        <h1>{trip.name}</h1>
        <div className="container flex-wrap row">
          {buildMemories}
        </div>
        <div className="containter button-container col-12">
          <Link className="btn custom-button-acid mr10 font-marker" to={{ pathname: newMemoryLink, tripId }}><i class="fas fa-plus"></i> New Memory</Link>
          <Link className="btn custom-button-cyan mr10 font-marker" to={{ pathname: editTripLink, tripId }}><i class="far fa-edit"></i> Edit Trip Details</Link>
          <button className="btn custom-button-purple font-marker" onClick={this.deleteTripAndMemories}><i class="far fa-trash-alt"></i> Delete This Trip</button>
        </div>
      </div>
    );
  }
}

export default SingleTrip;
