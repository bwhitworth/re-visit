import React from 'react';
import { FormGroup, Label, FormText } from 'reactstrap';
// import { DatePicker } from 'reactstrap-date-picker';

import authData from '../../../helpers/data/authData';
import tripsData from '../../../helpers/data/tripsData';
import './NewTrip.scss';

const DatePicker = require('reactstrap-date-picker');

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

  constructor(props) {
    super(props);
    this.state = {
      value: new Date().toISOString(),
    };
  }

  handleChange(value, formattedValue) {
    this.setState({
      value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue, // Formatted String, ex: "11/19/2016"
    });
  }

  componentDidUpdate() {
    // Access ISO String and formatted values from the DOM.
    const hiddenInputElement = document.getElementById('example-datepicker');
    console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')); // Formatted String, ex: "11/19/2016"
  }

  render() {
    const {
      tripName,
      tripStartDate,
      tripEndDate,
    } = this.state;

    return (
      <div className="NewTrip col-12">
      <h1>New Trip</h1>
      <form className="col-md-6 offset-md-3">
      <div className="form-group">
        <label className="label-custom" htmlFor="trip-name">Trip Name</label>
        <input type="trip-name" placeholder="Europe, Girl's Trip 2020, etc..." className="form-control" id="trip-name" value={tripName} onChange={this.nameChange} aria-describedby="tripNameHelp"/>
      </div>
      <div className="form-group">
        <label className="label-custom" htmlFor="trip-start-date">Start Date</label>
        <input type="trip-start-date" placeholder="MM/DD/YYYY" className="form-control" id="trip-start-date" value={tripStartDate} onChange={this.startDateChange} aria-describedby="tripStartHelp"/>
      </div>
      <FormGroup>
        <Label>My Date Picker</Label>
        <DatePicker id = "example-datepicker"
                    value = {this.state.value}
                    onChange= {(v, f) => this.handleChange(v, f)} />
        <FormText>Help</FormText>
      </FormGroup>
      <div className="form-group">
        <label className="label-custom" htmlFor="trip-end-date">End Date</label>
        <input type="trip-end-date" placeholder="MM/DD/YYYY" className="form-control" id="trip-end-date" value={tripEndDate} onChange={this.endDateChange} aria-describedby="tripEndHelp"/>
      </div>
      <button type="submit" className="btn button-acid" onClick={this.saveTrip}><i className="fas fa-check"></i> Save</button>
    </form>
      </div>
    );
  }
}

export default NewTrip;
