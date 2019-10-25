import React, { Component } from 'react';
import './App.css';
import AllPets from './AllPets';
import NewPet from './NewPet';
import OnePet from './OnePet';
import EditPet from './EditPet';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <span className="border border-secondary rounded">
            <h1>Pet Shelter</h1>
            <Route exact path="/" component={AllPets} />
            <Route path="/new" component={NewPet} />
            <Route path="/pets/:_id" component={OnePet} />
            <Route path="/edit/:_id" component={EditPet} />
          </span>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
