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
    const { memoryId } = this.props.match.params;
    const singleTripLink = `/trips/${memory.tripId}`;
    const editMemoryLink = `/memories/edit/${memoryId}`;
    return (
      <div className="SingleMemory col-12">
        <h1>{memory.name}</h1>
        <p className="font-bubblegum">{memory.location} - {memory.date}</p>
        <p className="font-cyan">{memory.notes}</p>
        <div className="containter button-container col-12">
          <Link className="btn button-acid mr10 mb10" to={singleTripLink}><i className="fas fa-backward"></i> Go Back</Link>
          <Link className="btn button-cyan mr10 mb10" to={editMemoryLink}><i className="far fa-edit"></i> Edit Details</Link>
          <button className="btn button-purple mb10" onClick={this.deleteMemory}><i className="far fa-trash-alt"></i> Delete This Memory</button>
        </div>
      </div>
    );
  }
}

export default SingleMemory;
