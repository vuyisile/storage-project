import React, { Component } from 'react';
import '../App.css'
// import { connect } from 'react-redux';
import jwt from "jsonwebtoken"
import axios from 'axios'

class Welcome extends Component {
    constructor() {
        super();
        this.changeRoute = this.changeRoute.bind(this);
    }
    async componentDidMount() {
        await this.getAllUnits()
        var auth = JSON.parse(sessionStorage.getItem('auth'))
        if (auth !== null) {
            var user = jwt.decode(auth.token);
            this.setState({ user: user })
        }

    }
    async getAllUnits() {
        var units = await axios.get('http://localhost:3001/availableUnits');
        this.setState({ units: units.data });
        console.log('units :', units); 
        return units
    }
    changeRoute(newPathname) {
        window.location.pathname = newPathname;
    }
    render() {
        return (<div className={'color my-container form-pos'}>
            <div>
                <h1 style={{ marginRight: 5.3 + 'em' }}>GetStore</h1>
                <br />
                <h2>Want put your warehouse,garage/store-room on the market, we got you!!</h2>
                <button onClick={() => this.changeRoute('/registerBusiness')}>Register Business</button>
                <br />
                <h2>Need a place to store you stuff, we got you!!</h2>
                <button onClick={() => this.changeRoute('/userChoice')}>Rent a place here</button>
                <br />
            </div>
            
            <div className={'color my-container container'}>
                <center>
                    <h3>Units</h3>
                </center>
                <div className={'tbl units-display'}>
                    {this.state.units.map((unit, i) => <div
                        key={i}
                        style={{ backgroundColor: '#ccc' }} >
                        <span style={{ marginLeft: 10 + '%' }}>
                            <p>name :{unit.name}</p>
                            <p>type :{unit.type}</p>
                            <p>length :{unit.unit_length + 'm'}</p>
                            <p>width :{unit.unit_width + 'm'}</p>
                            <p>height :{unit.unit_height + 'm'}</p>
                            <p>city :{unit.city_or_town}</p>
                        </span>
                        <button

                            disabled={unit.status === 'available' ? false : true}
                            onClick={() => this.updateUnit(unit.id)} style={{ width: 10 + 'em' }} className={'btn btn-default'}>rent</button>
                    </div>)}
                </div>
            </div>
        
        </div>
        );
    }
}



export default Welcome;