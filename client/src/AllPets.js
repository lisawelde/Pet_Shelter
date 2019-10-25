import React, { Component } from 'react';
import './App.css';
import pets from './pets.png';
import axios from 'axios';

class AllPets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pets: []
		}
	}

	componentDidMount() {
		axios.get("http://localhost:8000/api/pets")
			.then(res => this.setState({ pets: res.data }))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<>
				<img src={pets} alt="pets" />
				<h2>These pets are looking for a home!</h2>
				<a href="/new" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Add a pet to the shelter</a>
				{
					<table className="table table-striped">
					<tbody>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Actions</th>
					</tr>
					{
						this.state.pets.map(pet =>
							<tr key={pet._id}>
								<td>{pet.name}</td>
								<td>{pet.type}</td>
								<td>
								<a href={"/pets/" + pet._id} className="btn btn-outline-success small-button" role="button">View</a>
								<a href={"/edit/" + pet._id} className="btn btn-outline-warning small-button" role="button">Edit</a>
								</td>
							</tr>
						)
					}
					</tbody>
					</table>
				}
			</>
		);
	}
}

export default AllPets;
