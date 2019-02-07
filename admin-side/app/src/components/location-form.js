import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
import BusinessNavbar from './business-navbar'


class RegisterLocation extends Component {
  constructor() {
    super();
    this.state = {
      selectCompany: [],
      addressLine1: '',
      addressLine2: '',
      zipCode: '',
      cityOrTown: '',
      companyIdName: ''
    }
    this.gotoNext = this.gotoNext.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.submitData = this.submitData.bind(this)
  }
  async componentDidMount() {
    var businesses = await axios.get('http://localhost:3001/businesses');
    console.log('businesses :', businesses);
    this.setState({ selectCompany: businesses.data })
  }
  handleInput(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }
  handleSelect(val) {
    this.setState({ companyIdName: val })
  }
  submitData(e) {
    e.preventDefault()
    var data = {
      companyIdName: this.state.companyIdName,
      addressLine1: this.state.addressLine1,
      addressLine2: this.state.addressLine2.length === 0 ? 'null' : this.state.addressLine2,
      cityOrTown: this.state.cityOrTown,
      zipCode: this.state.zipCode
    };
    if (this.state.companyIdName.length > 0 && this.state.addressLine1.length > 0 && this.state.cityOrTown.length > 0 && this.state.zipCode.length > 0) {
      axios.post('http://localhost:3001/location', data)
      this.gotoNext();
    } else {
      document.getElementById('error').innerText = 'please complete the form'
    }
  }

  gotoNext() {
    window.location.pathname = '/block';
  }

  render() {
    return (<div>
      <BusinessNavbar />
      <div className={'color container my-container'}>
        <h3>Location</h3>
        <p id={'error'}></p>
        <form className={'location-form'}>
          <label>Company</label>
          <select>
            <option value={'select-company'}>select company</option>
            {this.state.selectCompany.map((key, i = 0) => <option key={key.company_name + i++} value={this.state.companyIdName} onClick={() => this.handleSelect(key.company_name)}>{key.company_name}</option>)}
          </select>

          <label>
            Address Line 1
            </label>

          <input type='text' name='addressLine1' onChange={this.handleInput} value={this.state.addressLine1} />

          <label>
            Address Line 2
            </label>

          <input type='text' name='addressLine2' onChange={this.handleInput} value={this.state.addressLine2} />

          <label>
            City/Town
            </label>

          <input type='telephone' name='cityOrTown' onChange={this.handleInput} value={this.state.cityOrTown} />

          <label>
            Zip Code
            </label>

          <input type='text' name='zipCode' onChange={this.handleInput} value={this.state.zipCode} />
<div className={''}>
          <button className={'btn-margin btn btn-default'}>Cancel</button>
          <button className={'btn-margin pos btn btn-default'} onClick={this.submitData}>Next</button>
</div>

        </form>
      </div>
    </div>
    );
  }
}

export default RegisterLocation;