import React, { Component } from 'react';
import './App.css';
import adopt from './adopt_a_pet.jpg';
import axios from 'axios';

class OnePet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {
        name: "",
        type: "",
        description: "",
        skills: "",
        likes: ""
      },
      count: 0
    }
  }
  
  increment = () => {
    let newCount = this.state.count + 1
    this.setState({
      count: newCount
    })
  }

  componentDidMount() {
    let _id = this.props.match.params._id;
    axios.get(`http://localhost:8000/api/pets/${_id}`)
      .then(res => { this.setState({ pet: res.data }) })
      .catch(err => console.log(err));
  }

  adopt = e => {
    let _id = this.props.match.params._id;
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/pets/${_id}`)
      .then(res => this.props.history.push("/"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <img className="photo" src={adopt} alt="adopt" />
        <h2>Details about {this.state.pet.name}</h2>
        <p>Pet Type: {this.state.pet.type}</p>
        <p>Description: {this.state.pet.description}</p>
        <p>Skills: {this.state.pet.skills}</p>
        <p>Likes: {this.state.count}</p>        
        <button type="button" className="btn btn-warning" onClick={this.increment}>👍 Like this pet</button>
        <button type="button" className="btn btn-danger" onClick={this.adopt}>❤️ Adopt this pet!</button>
      </>
    );
  }
}

export default OnePet;
