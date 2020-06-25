import React from 'react';

import authData from '../../../helpers/data/authData';
import memoriesData from '../../../helpers/data/memoriesData';
import './EditMemory.scss';

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
        });
      })
      .catch((err) => console.error('unable to get this memory for editing: ', err));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ memoryName: e.target.value });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ memoryDate: e.target.value });
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
    } = this.state;

    const updatedMemory = {
      name: memoryName,
      date: memoryDate,
      location: memoryLocation,
      categoryId: memoryCategoryId,
      notes: memoryNotes,
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

    return (
      <div className="EditMemory col-12">
      <h3>Edit Memory Details</h3>
      <form className="col-6 offset-3">
      <div className="form-group">
        <label htmlFor="memory-name">Memory Name</label>
        <input type="text" className="form-control" id="memory-name" value={memoryName} onChange={this.nameChange} aria-describedby="memNameHelp"/>
      </div>

      <div className="form-check row" htmlFor="category">
        <input className="form-check-input" type="radio" name="category" id="category1" onChange={this.categoryChange}/>
        <label className="form-check-label" htmlFor="FoodDrink">Food & Drink</label>
      </div><div className="form-check row" htmlFor="category">
        <input className="form-check-input" type="radio" name="category" id="category2" onChange={this.categoryChange}/>
        <label className="form-check-label" htmlFor="Adventure">Adventure</label>
        </div><div className="form-check row" htmlFor="category">
        <input className="form-check-input" type="radio" name="category" id="category3" onChange={this.categoryChange}/>
        <label className="form-check-label" htmlFor="Photo">Photo</label>
        </div><div className="form-check row" htmlFor="category">
        <input className="form-check-input" type="radio" name="category" id="category4" onChange={this.categoryChange}/>
        <label className="form-check-label" htmlFor="Note">Note</label>
      </div>

      <div className="form-group">
        <label htmlFor="memory-date">Date</label>
        <input type="text" placeholder="MM/DD/YYYY" className="form-control" id="memory-date" value={memoryDate} onChange={this.dateChange} aria-describedby="memDateHelp"/>
      </div>
      <div className="form-group">
        <label htmlFor="memory-location">Location</label>
        <input type="text" placeholder="place, neighborhood, etc..." className="form-control" id="memory-location" value={memoryLocation} onChange={this.locationChange} aria-describedby="memLocationHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="memory-notes">Notes</label>
        <input type="text" placeholder="This was awesome because..." className="form-control" id="memory-notes" value={memoryNotes} onChange={this.notesChange} aria-describedby="memNotesHelp"/>
      </div>

      <button type="submit" className="btn btn-primary" onClick={this.updateMemory}>Save Changes</button>
    </form>
      </div>
    );
  }
}

export default EditMemory;
