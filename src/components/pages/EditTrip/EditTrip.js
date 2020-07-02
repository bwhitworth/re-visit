import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';
import './EditTrip.scss';
import 'react-datepicker/dist/react-datepicker.css';

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

  startDateChange = (date) => {
    this.setState({ tripStartDate: date });
  }

  endDateChange = (date) => {
    this.setState({ tripEndDate: date });
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
      startDate: moment(tripStartDate).format('MMMM D, YYYY'),
      endDate: moment(tripEndDate).format('MMMM D, YYYY'),
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

    const placeholderStartDate = moment(tripStartDate).format('MM/DD/YYYY');
    const placeholderEndDate = moment(tripEndDate).format('MM/DD/YYYY');

    return (
      <div className="EditTrip col-12">
      <h1 className="font-marker">Edit Trip Details</h1>
      <form className="col-md-6 offset-md-3">
      <div className="form-group">
        <label className="label-custom" htmlFor="trip-name">Trip Name</label>
        <input type="trip-name" className="form-control text-center" id="trip-name" value={tripName} onChange={this.nameChange} aria-describedby="tripNameHelp"/>
      </div>
      <div className="form-group">
        <label className="label-custom" htmlFor="trip-start-date">Start Date</label>
        <br></br>
        <DatePicker
        className="picker"
        placeholderText={placeholderStartDate}
        onChange={this.startDateChange}
        dateFormat={'MM/dd/yyyy'}
        />
      </div>
      <div className="form-group">
        <label className="label-custom" htmlFor="trip-end-date">End Date</label>
        <br></br>
        <DatePicker
        className="picker"
        placeholderText={placeholderEndDate}
        onChange={this.endDateChange}
        dateFormat={'MM/dd/yyyy'}
        />
      </div>
      <button className="btn button-acid" onClick={this.updateTrip}><i className="fas fa-check"></i> Save</button>
    </form>
      </div>
    );
  }
}

export default EditTrip;
