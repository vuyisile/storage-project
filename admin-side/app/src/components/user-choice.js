import React, { Component } from 'react';
import '../App.css'
// import { connect } from 'react-redux';

class UserChoice extends Component {
    constructor() {
        super();
        this.changeRoute = this.changeRoute.bind(this);
    }
    changeRoute(newPathname) {
        window.location.pathname = newPathname;
    }
    render() {
        return (<div className={'color form-pos container'}>
            <h1 style={{ marginRight: 5.3 + 'em' }}>GetStore</h1>
            <br/>
            <h3>Click the sign-up button if you've never created an account with us</h3>
            <button onClick={()=>this.changeRoute('/signup')}>Sign Up</button>
            <br/>
            <h3>Or login if you have</h3>
            <button onClick={()=>this.changeRoute('/login')}>Login</button>
            <br/>
        </div>
        );
    }
}



export default UserChoice;