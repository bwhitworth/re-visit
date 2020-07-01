import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';

import MemoryCard from '../../shared/MemoryCard/MemoryCard';

import tripsData from '../../../helpers/data/tripsData';
import memoriesData from '../../../helpers/data/memoriesData';

import './SingleTrip.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

  submit = () => {
    const { trip } = this.state;
    confirmAlert({
      title: 'Wait a second...',
      message: `You want to delete "${trip.name}" and all its memories?`,
      buttons: [
        {
          label: 'Yes, delete it',
          onClick: this.deleteTripAndMemories,
        },
        {
          label: 'Never mind',
        },
      ],
    });
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
        <Link className="btn button-cyan mb10 mr10 low-pad font-marker" to={{ pathname: newMemoryLink, tripId }}><i className="fas fa-plus"></i> New Memory</Link>
        <div className="container row flex-wrap">
          {buildMemories}
        </div>
        <div className="container button-container col-12">
          <Link className="btn button-acid mb10 mr10 font-marker" to={{ pathname: editTripLink, tripId }}><i className="far fa-edit"></i> Edit Trip Details</Link>
          <button className="btn button-purple mb10 font-marker" onClick={this.submit}><i className="far fa-trash-alt"></i> Delete This Trip</button>
        </div>
      </div>
    );
  }
}

export default SingleTrip;
