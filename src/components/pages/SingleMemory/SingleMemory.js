import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';

import memoriesData from '../../../helpers/data/memoriesData';
import './SingleMemory.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

  submit = () => {
    const { memory } = this.state;
    confirmAlert({
      title: 'Wait a second...',
      message: `You want to delete "${memory.name}"?`,
      buttons: [
        {
          className: 'confirm-btn-yes',
          label: 'Yes, delete it',
          onClick: this.deleteMemory,
        },
        {
          className: 'confirm-btn-no',
          label: 'Never mind',
        },
      ],
    });
  };

  render() {
    const { memory } = this.state;
    const { memoryId } = this.props.match.params;
    const singleTripLink = `/trips/${memory.tripId}`;
    const editMemoryLink = `/memories/edit/${memoryId}`;
    return (
      <div className="SingleMemory col-12">
        <h1>{memory.name}</h1>
        <h4 className="font-bubblegum">{memory.location} - {memory.date}</h4>
        <h4 className="font-cyan">{memory.notes}</h4>
        <img className="col-sm-6" src={memory.imageUrl} alt="memory"/>
        <div className="containter button-container col-12"><br/>
          <Link className="btn button-acid mr10 mb10 font-marker" to={singleTripLink}><i className="fas fa-backward"></i> Go Back</Link>
          <Link className="btn button-cyan mr10 mb10 font-marker" to={editMemoryLink}><i className="far fa-edit"></i> Edit Details</Link>
          <button className="btn button-purple mb10 font-marker" onClick={this.submit}><i className="far fa-trash-alt"></i> Delete This Memory</button>
        </div>
      </div>
    );
  }
}

export default SingleMemory;
