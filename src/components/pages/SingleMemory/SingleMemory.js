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

  render() {
    const { memory } = this.state;
    const singleTripLink = `/trips/${memory.tripId}`;
    return (
      <div className="SingleMemory">
        <h3>{memory.name}</h3>
        <h3>{memory.date}</h3>
        <Link to={singleTripLink}>Go Back</Link>
      </div>
    );
  }
}

export default SingleMemory;
