import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
// import { connect } from 'react-redux';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    handleInput(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    submitData() {
        axios.post('http://localhost:3001/login', this.state).then((res)=>{
        console.log({token:res.data.token});    
        sessionStorage.setItem('auth', JSON.stringify({token:res.data.token}))
        setTimeout(() => {
            window.location.pathname = '/myUnits'
        }, 3000);
    });
    }
    render() {
        return (
        <div style={{ marginTop: 5.3 + 'em' }} className={'color container'}>
            <center>
            <h3 >Login</h3>
            <form>
                <div>
                    <input style={{ marginTop: 1 + 'em' }} placeholder={'email'} type='text' name='email' onChange={this.handleInput} value={this.state.username} /><br />
                    <input style={{ marginTop: 1 + 'em' }}placeholder={'password'} type='password' name='password' onChange={this.handleInput} value={this.state.password} /><br />
                </div>
            </form>
            <button className={'btn btn-primary'}style={{ marginTop: 2.3 + 'em', width:19+'%' }} onClick={this.submitData}>Login</button>
            </center>
        </div>
        );
    }
}



export default Login;