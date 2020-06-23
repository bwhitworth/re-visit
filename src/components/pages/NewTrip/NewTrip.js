import React from 'react';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';
import './NewTrip.scss';

class NewTrip extends React.Component {
  state = {
    tripName: '',
    tripStartDate: '',
    tripEndDate: '',
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

  saveTrip = (e) => {
    e.preventDefault();
    const {
      tripName,
      tripStartDate,
      tripEndDate,
    } = this.state;
    const newTrip = {
      name: tripName,
      startDate: tripStartDate,
      endDate: tripEndDate,
      uid: authData.getUid(),
    };
    tripsData.postNewTrip(newTrip)
      .then(() => this.props.history.push('/trips'))
      .catch((err) => console.error('could not post new trip:', err));
  };

  render() {
    const {
      tripName,
      tripStartDate,
      tripEndDate,
    } = this.state;

    return (
      <div className="NewTrip col-12">
      <h3>New Trip</h3>
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
      <button type="submit" className="btn btn-primary" onClick={this.saveTrip}>Submit</button>
    </form>
      </div>
    );
  }
}

export default NewTrip;
