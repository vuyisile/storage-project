import React, { Component } from 'react';
import './App.css';
import Units from './components/unit-form'
import TypesOfUnits from './components/unit-type-form'
import Blocks from './components/blocks-form'
import RegisterLocation from './components/location-form'
import SignUp from './components/signup'
import Login from './components/login'
import Welcome from './components/welcome-page'
import UserChoice from './components/user-choice'
import MyUnits from './components/units'
import AvailableUnits from './components/available-units'
import axios from "axios";
import jwt from "jsonwebtoken"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  setHeaders() {
    var auth = JSON.parse(sessionStorage.getItem('auth'))
    if (auth === null) {
      axios.defaults.headers.common['Auth'] = null
    } else {
      axios.defaults.headers.common['Auth'] = auth.token
      var user = jwt.decode(auth.token);
      var interval = setInterval(() => {
        var exp = user.exp;
        var time = new Date().getTime() / 1000
        if (time >= exp) {
          axios.defaults.headers.common['Auth'] = null
          sessionStorage.clear();
          clearTimeout(interval)
          console.log('token expired')
          return 'token expired';
        } else {
          console.log({ exp, time })
          return { exp, time }
        }
      }, (60000))
    }


    return auth
  }

  managePaths() {
    var newHeaders = this.setHeaders();
    const pathName = window.location.pathname;
    if (newHeaders === null) {
      while (newHeaders) {
        pathName = ""
        break
      };
      switch (pathName) {
        case '/signup':
          return <SignUp />

        case '/login':
          return <Login />

        default:
        case '/':
          return <UserChoice />

      }
    } else {
      switch (pathName) {
        case '/unit':
          return <Units />;

        case '/type':
          return <TypesOfUnits />


        case '/block':
          return <Blocks />

        case '/location':
          return <RegisterLocation />


        case '/myUnits':
          return <MyUnits />

        case '/availableUnits':
          return <AvailableUnits />

      }

    }

    // switch (pathName) {
    //   case '/unit':
    //     return <Units />;

    //   case '/type':
    //     return <TypesOfUnits />


    //   case '/block':
    //     return <Blocks />

    //   case '/location':
    //     return <RegisterLocation />

    //   case '/signup':
    //     return <SignUp />

    //   case '/login':
    //     return <Login />

    //   case '/myUnits':
    //     return <MyUnits />

    //   case '/availableUnits':
    //     return <AvailableUnits />

    //   default:
    //   case '/':
    //     return <UserChoice />

    // }
  }
  render() {
    return (
      <div className="">
        {this.managePaths()}
      </div>
    );
  }
}

export default App;
