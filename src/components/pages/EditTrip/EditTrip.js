import React from 'react';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';
import './EditTrip.scss';

class EditTrip extends React.Component {
  state = {
    tripName: '',
    tripStartDate: '',
    tripEndDate: '',
  }

  componentDidMount() {
    const tripIdToEdit = this.props.match.params.tripId;
    tripsData.getSingleTrip(tripIdToEdit)
      .then((response) => {
        const trip = response.data;
        this.setState({
          tripName: trip.name,
          tripStartDate: trip.startDate,
          tripEndDate: trip.endDate,
        });
      })
      .catch((err) => console.error('unable to get this trip for editing: ', err));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ tripName: e.target.value });
  }

  startDateChange = (e) => {
    e.preventDefault();
    this.setState({ tripStartDate: e.target.value });
  }

  endDateChange = (e) => {
    e.preventDefault();
    this.setState({ tripEndDate: e.target.value });
  }

  updateTrip = (e) => {
    e.preventDefault();
    const { tripId } = this.props.match.params;
    const {
      tripName,
      tripStartDate,
      tripEndDate,
    } = this.state;
    const updatedTrip = {
      name: tripName,
      startDate: tripStartDate,
      endDate: tripEndDate,
      uid: authData.getUid(),
    };
    tripsData.updateTrip(tripId, updatedTrip)
      .then(() => this.props.history.push(`/trips/${tripId}`))
      .catch((err) => console.error('could not update this trip:', err));
  };

  render() {
    const {
      tripName,
      tripStartDate,
      tripEndDate,
    } = this.state;

    return (
      <div className="EditTrip col-12">
      <h3>Edit Trip Details</h3>
      <form className="col-6 offset-3">
      <div className="form-group">
        <label htmlFor="trip-name">Trip Name</label>
        <input type="trip-name" placeholder="Europe, Girl's Trip 2020, etc..." className="form-control" id="trip-name" value={tripName} onChange={this.nameChange} aria-describedby="tripNameHelp"/>
      </div>
      <div className="form-group">
        <label htmlFor="trip-start-date">Start Date</label>
        <input type="trip-start-date" placeholder="MM/DD/YYYY" className="form-control" id="trip-start-date" value={tripStartDate} onChange={this.startDateChange} aria-describedby="tripStartHelp"/>
      </div>
      <div className="form-group">
        <label htmlFor="trip-end-date">End Date</label>
        <input type="trip-end-date" placeholder="MM/DD/YYYY" className="form-control" id="trip-end-date" value={tripEndDate} onChange={this.endDateChange} aria-describedby="tripEndHelp"/>
      </div>
      <button className="btn btn-primary" onClick={this.updateTrip}>Save Changes</button>
    </form>
      </div>
    );
  }
}

export default EditTrip;
