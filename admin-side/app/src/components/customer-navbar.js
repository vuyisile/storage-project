import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
import { userInfo } from 'os';
import jwt from "jsonwebtoken"



class CustomerNavbar extends Component {
  constructor() {
    super();
    this.state = { user: {} }
    this.logOut = this.logOut.bind(this)
  }
  getUser() {
    if (this.state.user.userType === 'tanent') {
      var user = axios.get('http://localhost:3001/units')
      console.log('user :', user);
    }
  }
  componentDidMount() {
    var auth = JSON.parse(sessionStorage.getItem('auth'))
    if (auth !== null) {
      var user = jwt.decode(auth.token);
      this.setState({ user: user })
    }
  }

  logOut() {
    axios.defaults.headers.common['Auth'] = null;
    sessionStorage.clear();
    window.location.pathname = '/login'
  }

  render() {
    return (
      < div >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-brand btn btn-default" >{this.state.user===null?'':this.state.user.userName}</button>
        <button className={'btn btn-logout'} onClick={()=>this.logOut()}>logout</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/myUnits">My-units</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href='/availableUnits'>Available-units</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Help</a>
              </li>
            </ul>
          </div>
        </nav>
      </div >
    );
  }
}

export default CustomerNavbar;