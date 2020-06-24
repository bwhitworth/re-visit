import React from 'react';
import { Link } from 'react-router-dom';

import memoriesData from '../../../helpers/data/memoriesData';
import './SingleMemory.scss';

class SingleMemory extends React.Component {
  state = {
    memory: {},
  }

  componentDidMount() {
    const { memoryId } = this.props.match.params;
    memoriesData.getSingleMemory(memoryId)
      .then((response) => this.setState({ memory: response.data }))
      .catch((err) => console.error('could not get single memory:', err));
  }

  deleteMemory = () => {
    const memoryForDelete = this.props.match.params.memoryId;
    const parentTripId = this.state.memory.tripId;
    memoriesData.deleteSingleMemory(memoryForDelete)
      .then(() => {
        this.props.history.push(`/trips/${parentTripId}`);
      })
      .catch((err) => console.error('could not delete this memory:', err));
  };

  render() {
    const { memory } = this.state;
    const singleTripLink = `/trips/${memory.tripId}`;
    return (
      <div className="SingleMemory col-12">
        <h3>{memory.name}</h3>
        <p>{memory.location} - {memory.date}</p>
        <p>{memory.notes}</p>
        <Link className="btn btn-primary" to={singleTripLink}>Go Back</Link>
        <button className="btn btn-secondary" onClick={this.deleteMemory}>Delete This Memory</button>
      </div>
    );
  }
}

export default SingleMemory;
