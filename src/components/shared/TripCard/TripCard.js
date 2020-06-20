import React from 'react';

import tripShape from '../../../helpers/propz/tripShape';
import './TripCard.scss';

class ScatCard extends React.Component {
  static propTypes = {
    trip: tripShape.tripShape,
  }

  render() {
    const { trip } = this.props;
    return (
      <div className="TripCard col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{trip.name}</h5>
            <p className="card-text">{trip.startDate}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ScatCard;
