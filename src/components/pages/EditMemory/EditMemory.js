import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import authData from '../../../helpers/data/authData';
import memoriesData from '../../../helpers/data/memoriesData';
import './EditMemory.scss';
import 'react-datepicker/dist/react-datepicker.css';

class EditMemory extends React.Component {
  state = {
    memoryName: '',
    memoryDate: '',
    memoryLocation: '',
    memoryCategoryId: '',
    memoryNotes: '',
  }

  componentDidMount() {
    const memIdToEdit = this.props.match.params.memoryId;
    memoriesData.getSingleMemory(memIdToEdit)
      .then((response) => {
        const memory = response.data;
        this.setState({
          memoryName: memory.name,
          memoryDate: memory.date,
          memoryLocation: memory.location,
          memoryCategoryId: memory.categoryId,
          memoryNotes: memory.notes,
          memoryTripId: memory.tripId,
          memoryIsFavorie: memory.isFavorite,
        });
      })
      .catch((err) => console.error('unable to get this memory for editing: ', err));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ memoryName: e.target.value });
  }

  dateChange = (date) => {
    this.setState({ memoryDate: date });
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

  updateMemory= (e) => {
    e.preventDefault();
    const { memoryId } = this.props.match.params;

    const {
      memoryName,
      memoryDate,
      memoryLocation,
      memoryCategoryId,
      memoryNotes,
      memoryTripId,
      memoryIsFavorie,
    } = this.state;

    const updatedMemory = {
      name: memoryName,
      date: moment(memoryDate).format('MM/DD/YYYY'),
      location: memoryLocation,
      categoryId: memoryCategoryId,
      notes: memoryNotes,
      tripId: memoryTripId,
      isFavorite: memoryIsFavorie,
      uid: authData.getUid(),
    };

    memoriesData.updateMemory(memoryId, updatedMemory)
      .then(() => this.props.history.push(`/memories/${memoryId}`))
      .catch((err) => console.error('could not update this memory:', err));
  };

  render() {
    const {
      memoryName,
      memoryDate,
      memoryLocation,
      memoryNotes,
    } = this.state;

    const placeholderDate = moment(memoryDate).format('MM/DD/YYYY');

    return (
      <div className="EditMemory col-12">
      <h1>Edit Memory Details</h1>
      <form className="col-md-6 offset-md-3">
      <div className="form-group">
        <label className="label-custom" htmlFor="memory-name">Memory Name</label>
        <input type="text" className="form-control" id="memory-name" value={memoryName} onChange={this.nameChange} aria-describedby="memNameHelp"/>
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
        <label className="label-custom" htmlFor="memory-location">Location</label>
        <input type="text" placeholder="place, neighborhood, etc..." className="form-control"
        id="memory-location" value={memoryLocation} onChange={this.locationChange} aria-describedby="memLocationHelp"/>
      </div>

      <div className="form-group">
        <label className="label-custom" htmlFor="memory-notes">Notes</label>
        <input type="text" placeholder="This was awesome because..." className="form-control" id="memory-notes" value={memoryNotes} onChange={this.notesChange} aria-describedby="memNotesHelp"/>
      </div>

      <button type="submit" className="btn button-acid" onClick={this.updateMemory}><i className="fas fa-check"></i> Save</button>
    </form>
      </div>
    );
  }
}

export default EditMemory;
