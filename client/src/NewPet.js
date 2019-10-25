import React, { Component } from 'react';
import './App.css';
import pug from './pug.jpg';
import axios from 'axios';

class NewPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPet: {
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

  addPet = e => {
    e.preventDefault();
    console.log("hello")
    axios.post("http://localhost:8000/api/pets", this.state.newPet)
      .then(res => {
        console.log(res);
        if (res.data.errors) {
          console.log(res.data.errors);
          this.setState({ errors: res.data.errors });
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeName = e => {
    this.setState({ newPet: { ...this.state.newPet, name: e.target.value } });
  }

  changeType = e => {
    this.setState({ newPet: { ...this.state.newPet, type: e.target.value } });
  }

  changeDescription = e => {
    this.setState({ newPet: { ...this.state.newPet, description: e.target.value } });
  }

  changeSkills = e => {
    this.setState({ newPet: { ...this.state.newPet, skills: e.target.value } });
  }

  render() {
    return (
      <>
        <img className="photo" src={pug} alt="pug" />
        <h2>Know of a pet needing a home?</h2>
        <p>The pet must have a name</p>
        <div className="form-group">
        <form onSubmit={this.addPet}>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            onChange={this.changeName}
          />
          {
            this.state.errors.name ?
            <span>{this.state.errors.name.message}</span> :
            ""
          }
          <br />
          <select className="form-control" placeholder="Type" onChange={this.changeType}>
            <option>Pet Type...</option>
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
            placeholder="Description"
            onChange={this.changeDescription}
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
            type="textarea"
            placeholder="Skills"
            onChange={this.changeSkills}
          />
          <br />
          <input type="submit" role="button" className="btn btn-primary" value="Add pet" />
          <a href="/" className="btn btn-warning" role="button">Cancel</a>
        </form>
        </div>
      </>
    );
  }
}

export default NewPet;
