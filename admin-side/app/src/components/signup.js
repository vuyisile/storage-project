import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'


class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      telephone: '',
      role:'',
      business:''
    }
    this.gotoNext = this.gotoNext.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.submitData = this.submitData.bind(this)
  }
  handleInput(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }
  handleSelect(val) {
    this.setState({ role: val })
  }
  gotoNext() {
    if (window.location.pathname === '/') {
      window.location.pathname = '/units';
    }
  }
  submitData(e) {
    e.preventDefault();
    var email = this.state.email;
    var username = this.state.username;
    var password = this.state.password;
    var confirmPassword = this.state.confirmPassword;
    var telephone = this.state.telephone;
    var role = this.state.role;
  //  const {email, username, password, confirmPassword, telephone, role} = this.state;
    var testPassword = RegExp(password).test(this.state.confirmPassword)
    console.log(this.state)
    if (email.length > 0 && username.length > 0 && password.length > 0 && telephone.length > 0 && confirmPassword.length > 0 && role.length > 0) {
      if (testPassword === true) {
        axios.post('http://localhost:3001/signup', this.state).then(
          (res)=>{
            console.log({token:res.data.token});    
            sessionStorage.setItem('auth', JSON.stringify({token:res.data.token}))
            setTimeout(() => {
                window.location.pathname = '/login'
            }, 3000);
        }
        );
      } else {
        document.getElementById('error').innerText = 'please enter correct password'
      }
    } else {
      document.getElementById('error').innerText = 'please complete the form'
    }
  }

  render() {
    return (<div className={'color container my-container form-pos'}>
      <h3>Sign Up</h3>
      <p id={'error'}></p>
      <form className={'signup-form'}>
        <label>
          Role
      </label>
        <select name="role" onChange={this.handleInput}>
          <option value={'select-company'}>select role</option>
          <option key={'business'} value={'business'}>{'business'}</option>
          <option key={'tenant'} value={'tenant'} >{'tenant'}</option>
        </select>
        <label>
          Username
          </label>
        <input placeholder='enter username' type='text' name='username' onChange={this.handleInput} value={this.state.username} />

        <label>
          Telephone
          </label>
        <input placeholder='phone number' type='telephone' name='telephone' onChange={this.handleInput} value={this.state.telephone} />

        <label>
          Email
          </label>
        <input placeholder='email' type='email' name='email' onChange={this.handleInput} value={this.state.email} />

        <label>
          password
         </label>
        <input placeholder="password" type='password' name='password' onChange={this.handleInput} value={this.state.password} />

        <label>
          confirm password
         </label>
        <input placeholder="confirm password" type='password' name='confirmPassword' onChange={this.handleInput} value={this.state.confirmPassword} />

        {this.state.role === 'business'? <div style={{width:30+'%'}}><label>Business Name</label><input placeholder='enter business name' type='text' name='business' onChange={this.handleInput} value={this.state.business} /></div>:null }
      <div className={'btn-setting'}>
        <button className={'btn-margin'}>Cancel</button>
        <button className={'btn-margin pos'} onClick={this.submitData}>Sign Up</button>
      </div>
      </form>



    </div>
    );
  }
}

export default SignUp;