import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import memoriesData from '../../../helpers/data/memoriesData';
import './NewMemory.scss';
import 'react-datepicker/dist/react-datepicker.css';

class NewMemory extends React.Component {
  state = {
    memoryName: '',
    memoryDate: '',
    memoryImageUrl: '',
    memoryLocation: '',
    memoryCategoryId: '',
    memoryNotes: '',
    memoryTripId: '',
    memoryIsFavorite: false,
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ memoryName: e.target.value });
  }

  dateChange = (date) => {
    this.setState({ memoryDate: date });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ memoryImageUrl: e.target.value });
  }

  locationChange = (e) => {
    e.preventDefault();
    this.setState({ memoryLocation: e.target.value });
  }

  categoryChange = () => {
    const categoryButtons = document.getElementsByName('category');
    for (let i = 0, { length } = categoryButtons; i < length; i += 1) {
      if (categoryButtons[i].checked) {
        const selectedCategory = categoryButtons[i].id;
        this.setState({ memoryCategoryId: selectedCategory });
      }
    }
  }

  notesChange = (e) => {
    e.preventDefault();
    this.setState({ memoryNotes: e.target.value });
  }

  tripIdChange = (e) => {
    e.preventDefault();
    this.setState({ memoryTripId: e.target.value });
  }

  saveMemory= (e) => {
    e.preventDefault();
    const {
      memoryName,
      memoryDate,
      memoryImageUrl,
      memoryLocation,
      memoryCategoryId,
      memoryNotes,
    } = this.state;

    const newMemory = {
      name: memoryName,
      date: moment(memoryDate).format('MM/DD/YYYY'),
      imageUrl: memoryImageUrl,
      location: memoryLocation,
      categoryId: memoryCategoryId,
      notes: memoryNotes,
      tripId: this.props.location.tripId,
      uid: authData.getUid(),
    };

    memoriesData.postNewMemory(newMemory)
      .then(() => this.props.history.push(`/trips/${this.props.location.tripId}`))
      .catch((err) => console.error('could not post new memory:', err));
  };

  render() {
    const {
      memoryName,
      memoryDate,
      memoryImageUrl,
      memoryLocation,
      memoryNotes,
    } = this.state;

    const placeholderDate = moment(memoryDate).format('MM/DD/YYYY');

    return (
      <div className="NewMemory col-12">
      <h1>New Memory</h1>
      <form className="col-md-6 offset-md-3">
      <div className="form-group">
        <label className="label-custom font-midnight" htmlFor="memory-name">Memory Name</label>
        <input type="text" placeholder="Rock climbing, Tiki Bar, etc..." className="form-control" id="memory-name" value={memoryName} onChange={this.nameChange} aria-describedby="memNameHelp"/>
      </div>

      <div className="form-check row" htmlFor="category">
        <input className="form-check-input" type="radio" name="category" id="category1" onChange={this.categoryChange}/>
        <label className="form-check-label font-bubblegum" htmlFor="FoodDrink">Food & Drink</label>
      </div><div className="form-check row" htmlFor="category">
        <input className="form-check-input" type="radio" name="category" id="category2" onChange={this.categoryChange}/>
        <label className="form-check-label font-bubblegum" htmlFor="Adventure">Adventure</label>
        </div><div className="form-check row" htmlFor="category">
        <input className="form-check-input" type="radio" name="category" id="category3" onChange={this.categoryChange}/>
        <label className="form-check-label font-bubblegum" htmlFor="Photo">Photo</label>
        </div><div className="form-check row" htmlFor="category">
        <input className="form-check-input" type="radio" name="category" id="category4" onChange={this.categoryChange}/>
        <label className="form-check-label font-bubblegum" htmlFor="Note">Note</label>
      </div>

      <div className="form-group">
        <label className="label-custom" htmlFor="memory-date">Date</label>
        <br></br>
        <DatePicker
        className="picker"
        placeholderText={placeholderDate}
        onChange={this.dateChange}
        dateFormat={'MM/dd/yyyy'}
        />
      </div>

      <div className="form-group">
        <label className="label-custom" htmlFor="memory-imageUrl">Image Url</label>
        <input type="text" placeholder="paste your image url here" className="form-control"
        id="memory-imageUrl" value={memoryImageUrl} onChange={this.imageChange} aria-describedby="memImageHelp"/>
      </div>

      <div className="form-group">
        <label className="label-custom" htmlFor="memory-location">Location</label>
        <input type="text" placeholder="place, neighborhood, etc..." className="form-control"
        id="memory-location" value={memoryLocation} onChange={this.locationChange} aria-describedby="memLocationHelp"/>
      </div>

      <div className="form-group">
        <label className="label-custom" htmlFor="memory-notes">Notes</label>
        <input type="text" placeholder="This was awesome because..." className="form-control" id="memory-notes" value={memoryNotes} onChange={this.notesChange} aria-describedby="memNotesHelp"/>
      </div>

      <button type="submit" className="btn button-acid" onClick={this.saveMemory}><i className="fas fa-check"></i> Save</button>
    </form>
      </div>
    );
  }
}

export default NewMemory;
