import React from 'react';
import { Link } from 'react-router-dom';

import tripShape from '../../../helpers/propz/tripShape';
import './TripCard.scss';

class TripCard extends React.Component {
  static propTypes = {
    trip: tripShape.tripShape,
  }

  render() {
    const { trip } = this.props;
    const singleLink = `/trips/${trip.id}`;
    return (
      <div className="TripCard col-sm-4">
        <Link className="card custom-card" to={singleLink}>
          <div className="card-body low-pad">
            <h5 className="card-title">{trip.name}</h5>
            <p className="card-text">{trip.startDate}</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default TripCard;
