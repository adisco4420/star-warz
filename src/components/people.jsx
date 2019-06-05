import React, { Component } from 'react';
import axios from 'axios';

class People extends Component {
    state = {
        listOfPeople: null
    }
    componentDidMount() {
        this.fetchPeople()
    }
    async  fetchPeople() {
        try {
            const res = await axios.get('https://swapi.co/api/people/');
            this.setState({ listOfPeople: res.data.results })
        } catch (error) {
            console.log(error);
        }
    }
    state = {}
    render() {
        return (<div className="container">
            <div className="row m-3">
                <div className="col-sm-4">
                    <h3>Humans And Robots</h3>
                </div>
                <div className="col-sm-6  ml-auto">
                    <div className="row">
                        <div className="col-sm-6 mb-2">
                            <div>
                                <select className="form-control" >
                                    <option value="all-gender">All Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="robot">Robot</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" placeholder="search by name" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {
                    !this.state.listOfPeople ?
                        <div className="col-md-12 text-center">
                            <h6>Loading...</h6>
                        </div> :

                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Birth year</th>
                                        <th scope="col">Gender</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.listOfPeople.map((item, index) => {
                                            return <tr key={index}>

                                                <td>{item.name}</td>
                                                <td>{item.birth_year}</td>
                                                <td>{item.gender}</td>
                                                <td><a href="#">View</a></td>
                                            </tr>
                                        })
                                    }


                                </tbody>
                            </table>

                        </div>
                }

            </div>
        </div>);
    }
}

export default People;