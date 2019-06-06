import React, { Component } from 'react';
import axios from 'axios';

class StarShips extends Component {
    state = {
        listOfStarships: null,
        filteredList: null,
        detail: {}
    }
    componentDidMount() {
        this.fetchStarShips()
    }
    async  fetchStarShips() {
        try {
            const res = await axios.get('https://swapi.co/api/starships');
            this.setState({ listOfStarships: res.data.results, filteredList: res.data.results })
        } catch (error) {
            console.log(error);
        }
    }
    viewDetail = (detail) => {
        this.setState({ detail })
    }
    getShortDate = (date) => new Date(date).toLocaleDateString();
    handleSearch = e => {
        let { value } = e.target;
        value = value.toLowerCase();
        const filtered = this.state.listOfStarships.filter(val => val.name.toLowerCase().includes(value))
        this.setState({ filteredList: filtered })
    }

    render() {
        const detail = this.state.detail;
        return (<div className="container">
            <div className="row m-3">
                <div className="col-sm-4">
                    <h3>StarShips</h3>
                </div>
                <div className="col-sm-6  ml-auto">
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <input onChange={this.handleSearch} type="text" className="form-control" placeholder="search by name" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {
                    !this.state.listOfStarships ?
                        <div className="col-md-12 text-center">
                            <h6>Loading...</h6>
                        </div> :

                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Cargo capacity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.filteredList.map((item, index) => {
                                            return <tr key={index}>

                                                <td>{item.name}</td>
                                                <td>{item.model}</td>
                                                <td>{item.cargo_capacity}</td>
                                                <td><a onClick={() => this.viewDetail(item)} href="#" data-toggle="modal" data-target="#starships">View</a></td>
                                            </tr>
                                        })
                                    }
                                    {
                                        !this.state.filteredList.length && <tr>
                                            <td>No Data Found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>

                        </div>
                }

            </div>
            <div className="modal fade" id="starships" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{detail.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><b>Model: </b>{detail.model}</p>
                            <p><b>Cargo Capacity: </b>{detail.cargo_capacity}</p>
                            <p><b>MGLT: </b>{detail.MGLT}</p>
                            <p><b>Consumables: </b>{detail.consumables}</p>
                            <p><b>Cost In Credits: </b>{detail.cost_in_credits}</p>
                            <p><b>Crew: </b>{detail.crew}</p>
                            <p><b>Hyperdrive Rating: </b>{detail.hyperdrive_rating}</p>
                            <p><b>Starship Class: </b>{detail.starship_class}</p>
                            <p><b>Created Date: </b>{this.getShortDate(detail.created)}</p>
                            <p><b>Edited Date: </b>{this.getShortDate(detail.edited)}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default StarShips;