import React, { Component } from 'react';
import './App.css';
import cat from './cat.png';
import axios from 'axios';

class EditPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {
        name: "",
        type: "",
        description: "",
        skills: ""
      },
      errors: {
        name: "",
        type: "",
        description: "",
        skills: ""
      }
    }
  }

  componentDidMount() {
    let _id = this.props.match.params._id;
    axios.get(`http://localhost:8000/api/pets/${_id}`)
      .then(res => {
        this.setState({ pet: res.data });
      })
      .catch(err => console.log(err));
  }

  changeName = e => {
    this.setState({ pet: { ...this.state.pet, name: e.target.value } });
  }

  changeType = e => {
    this.setState({ pet: { ...this.state.pet, type: e.target.value } });
  }

  changeDescription = e => {
    this.setState({ pet: { ...this.state.pet, description: e.target.value } });
  }

  changeSkills = e => {
    this.setState({ pet: { ...this.state.pet, skills: e.target.value } });
  }

  updatePet = e => {
    e.preventDefault();
    let _id = this.props.match.params._id;
    axios.put(`http://localhost:8000/api/pets/${_id}`, this.state.pet)
      .then(res => {
        if (res.data.errors) {
          this.setState({ errors: res.data.errors });
        } else {
          this.props.history.push("/")
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <img className="photo" src={cat} alt="cat" />
        <h2>Edit this pet</h2>
        <div className="form-group">
        <form onSubmit={this.updatePet}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            onChange={this.changeName}
            value={this.state.pet.name}
          />
          {
            this.state.errors.name ?
            <span>{this.state.errors.name.message}</span> :
            ""
          }
          <br />
          <select className="form-control" value={this.state.pet.type} onChange={this.changeType}>
              <option>Please select...</option>
              <option>Cat</option>
              <option>Dog</option>
              <option>Rabbit</option>
              <option>Bird</option>
              <option>Hampster</option>
              <option>Reptile</option>
              <option>Other (please list below)</option>
          </select>
          {
            this.state.errors.type ?
            <span>{this.state.errors.type.message}</span> :
            ""
          }
          <br />
          <textarea
            className="form-control"
            placeholder="description"
            onChange={this.changeDescription}
            value={this.state.pet.description}
            rows="3">
          </textarea>
          {
            this.state.errors.description ?
            <span>{this.state.errors.description.message}</span> :
            ""
          }
          <br />
          <input
            className="form-control"
            type="text"
            placeholder="skills"
            onChange={this.changeSkills}
            value={this.state.pet.skills}
          />
          <br />
          <input type="submit" role="button" className="btn btn-primary" value="Edit pet" />
          <a href="/" className="btn btn-warning" role="button">Cancel</a>
        </form>
        </div>
      </>
    );
  }
}

export default EditPet;
