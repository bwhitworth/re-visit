import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';
import './NewTrip.scss';
import 'react-datepicker/dist/react-datepicker.css';

class NewTrip extends React.Component {
  state = {
    tripName: '',
    startDate: '',
    endDate: '',
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ tripName: e.target.value });
  }

  startDateChange = (date) => {
    this.setState({ startDate: date });
  }

  endDateChange = (date) => {
    this.setState({ endDate: date });
  }

  saveTrip = (e) => {
    e.preventDefault();
    const {
      tripName,
      tripStartDate = moment(this.state.startDate).format('MM/DD/YYYY'),
      tripEndDate = moment(this.state.endDate).format('MM/DD/YYYY'),
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
    } = this.state;

    return (
      <div className="NewTrip col-12">
      <h1>New Trip</h1>
      <form className="col-md-6 offset-md-3">
      <div className="form-group">
        <label className="label-custom" htmlFor="trip-name">Trip Name</label>
        <input type="trip-name" placeholder="Europe, Girl's Trip 2020, etc..."
        className="form-control" id="trip-name" value={tripName} onChange={this.nameChange} aria-describedby="tripNameHelp"/>
      </div>

      <div className="form-group">
        <label className="label-custom" htmlFor="trip-start-date">Start Date</label>
        <br></br>
        <DatePicker
        className="picker"
        selected={this.state.startDate}
        onChange={this.startDateChange}
        dateFormat={'MM/dd/yyyy'}
      />
      </div>

      <div className="form-group">
        <label className="label-custom" htmlFor="trip-end-date">End Date</label>
        <br></br>
        <DatePicker
        className="picker"
        selected={this.state.endDate}
        onChange={this.endDateChange}
        dateFormat={'MM/dd/yyyy'}
      />
      </div>

      <button type="submit" className="btn button-acid" onClick={this.saveTrip}><i className="fas fa-check"></i> Save</button>
    </form>
      </div>
    );
  }
}

export default NewTrip;
