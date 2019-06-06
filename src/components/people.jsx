import React, { Component } from "react";
import axios from "axios";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

class People extends Component {
  state = {
    listOfPeople: null,
    filteredList: null,
    pageSize: 4,
    currentPage: 1,
    detail: {}
  };
  componentDidMount() {
    this.fetchPeople();
  }
  async fetchPeople() {
    try {
      const res = await axios.get("https://swapi.co/api/people/");
      this.setState({
        listOfPeople: res.data.results,
        filteredList: res.data.results
      });
    } catch (error) {
      console.log(error);
    }
  }
  viewDetail = detail => {
    this.setState({ detail });
  };
  getShortDate = date => new Date(date).toLocaleDateString();
  parseGender = gender => (gender === "n/a" ? "robot" : gender);
  handleSearch = e => {
    let { value } = e.target;
    value = value.toLowerCase();
    const filtered = this.state.listOfPeople.filter(val =>
      val.name.toLowerCase().includes(value)
    );
    this.setState({ filteredList: filtered });
  };
  handleFilter = e => {
    let { value } = e.target;
    value = value.toLowerCase();
    let filtered;
    if (value === "all-gender") {
      filtered = this.state.listOfPeople;
    } else if (value === "robot") {
      filtered = this.state.listOfPeople.filter(val => val.gender === "n/a");
    } else {
      filtered = this.state.listOfPeople.filter(val => val.gender === value);
    }
    this.setState({ filteredList: filtered });
    console.log(value);
  };
  handelPageChange = page => {
      console.log(page);
    this.setState({ currentPage: page });
  };

  render() {
    const detail = this.state.detail;
    const count = this.state.filteredList ? this.state.filteredList.length : 0;
    const { pageSize, currentPage } = this.state;
    const paginated = paginate(this.state.filteredList, currentPage, pageSize)
    console.log(paginated);
    
    const genders = ["Male", "Female", "Robot"];
    return (
      <div className="container">
        <div className="row m-3">
          <div className="col-sm-4">
            <h3>Humans And Robots</h3>
          </div>
          <div className="col-sm-6  ml-auto">
            <div className="row">
              <div className="col-sm-6 mb-2">
                <div>
                  <select onChange={this.handleFilter} className="form-control">
                    <option value="all-gender">All Gender</option>
                    {genders.map((gender, index) => (
                      <option key={index} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <input
                  onChange={this.handleSearch}
                  type="text"
                  className="form-control"
                  placeholder="search by name"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {!this.state.listOfPeople ? (
            <div className="col-md-12 text-center">
              <h6>Loading...</h6>
            </div>
          ) : (
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
                  {paginated.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.birth_year}</td>
                        <td>{this.parseGender(item.gender)}</td>
                        <td>
                          <a
                            onClick={() => this.viewDetail(item)}
                            href="#"
                            data-toggle="modal"
                            data-target="#exampleModal"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                  {!paginated.length && (
                    <tr>
                      <td>No Data Found</td>
                    </tr>
                  )}
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
          )}
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {detail.name}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <b>Height: </b>
                  {detail.height}
                </p>
                <p>
                  <b>Birth Year: </b>
                  {detail.birth_year}
                </p>
                <p>
                  <b>Eye Color: </b>
                  {detail.eye_color}
                </p>
                <p>
                  <b>Gender: </b>
                  {detail.gender}
                </p>
                <p>
                  <b>Hair Color: </b>
                  {detail.hair_color}
                </p>
                <p>
                  <b>Mass: </b>
                  {detail.mass}
                </p>
                <p>
                  <b>SKin Color: </b>
                  {detail.skin_color}
                </p>
                <p>
                  <b>Created Date: </b>
                  {this.getShortDate(detail.created)}
                </p>
                <p>
                  <b>Edited Date: </b>
                  {this.getShortDate(detail.edited)}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default People;
