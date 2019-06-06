import React, { Component } from 'react';
import axios from 'axios';
import { paginate } from '../utils/paginate';
import Pagination from '../common/pagination';

class Planets extends Component {
    state = {
        listOfPlanets: null,
        filteredList: null,
        pageSize: 4,
        currentPage: 1,
        detail: {}
    }
    componentDidMount() {
        this.fetchPlanets()
    }
    async  fetchPlanets() {
        try {
            const res = await axios.get('https://swapi.co/api/planets');
            this.setState({ listOfPlanets: res.data.results, filteredList: res.data.results })
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
        const filtered = this.state.listOfPlanets.filter(val => val.name.toLowerCase().includes(value))
        this.setState({ filteredList: filtered })
    }
    handelPageChange = page => {
        this.setState({ currentPage: page });
      };
    

    render() {
        const detail = this.state.detail;
        const count = this.state.filteredList ? this.state.filteredList.length : 0;
        const { pageSize, currentPage } = this.state;
        const paginated = paginate(this.state.filteredList, currentPage, pageSize)
        return (<div className="container">
            <div className="row m-3">
                <div className="col-sm-4">
                    <h3>Planets</h3>
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
                    !this.state.listOfPlanets ?
                        <div className="col-md-12 text-center">
                            <h6>Loading...</h6>
                        </div> :

                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Temperature</th>
                                        <th scope="col">Population</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginated.map((item, index) => {
                                            return <tr key={index}>

                                                <td>{item.name}</td>
                                                <td>{item.climate}</td>
                                                <td>{item.population}</td>
                                                <td><a onClick={() => this.viewDetail(item)} href="#" data-toggle="modal" data-target="#planets">View</a></td>
                                            </tr>
                                        })
                                    }
                                    {
                                        !paginated.length && <tr>
                                            <td>No Data Found</td>
                                        </tr>
                                    }
                                </tbody>
                                <tfoot>
                  <tr>
                    <td colSpan="12">
                      <Pagination
                        itemCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handelPageChange}
                      />
                    </td>
                  </tr>
                </tfoot>
                            </table>

                        </div>
                }

            </div>
            <div className="modal fade" id="planets" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{detail.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><b>Temperature: </b>{detail.climate}</p>
                            <p><b>Population: </b>{detail.population}</p>
                            <p><b>Diameter: </b>{detail.diameter}</p>
                            <p><b>Gravity: </b>{detail.gravity}</p>
                            <p><b>Orbital Period: </b>{detail.orbital_period}</p>
                            <p><b>Surface Water: </b>{detail.surface_water}</p>
                            <p><b>Terrain: </b>{detail.terrain}</p>
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

export default Planets;