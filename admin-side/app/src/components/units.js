import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import BusinessNavbar from './business-navbar'
import CustomerNavbar from './customer-navbar'
import jwt from "jsonwebtoken"

// import { connect } from 'react-redux';

class MyUnits extends Component {
    constructor() {
        super();
        this.state = {
            units: [],
            user: {}
        }
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
        var units = await axios.get('http://localhost:3001/myUnits');
        this.setState({ units: units.data });
        console.log('units :', units);
        return units
    }
    updateUnit = id => {
        axios.post('http://localhost:3001/updateUnitStatus', { id: id })
            .then(res => {
                console.log(res)
                this.getAllUnits()
            })
            .catch(err => console.error(err))
    }

    changeStatus(currentStatus) {
        var unit = this.state.units
        if (currentStatus === 'available') {
            currentStatus = 'rented'
        }
        console.log('curState', currentStatus);
        // axios.post('http://localhost:3001/unit', data)
    }
    render() {
        return (<div>
            {this.state.user.userType === 'business' ? <BusinessNavbar /> : <CustomerNavbar />}

            <div className={'color my-container container'}>
                <center>
                    <h3>My Units</h3>
                </center>
                {this.state.user.userType === 'business' ? <table className={'tbl-container'}>
                    <thead className={'container'}>
                        <th>name</th>
                        <th>type</th>
                        <th>length</th>
                        <th>width</th>
                        <th>heigh</th>
                        <th>city/town</th>
                        <th>status</th>

                    </thead>
                    {this.state.units.map((unit, i) =>
                        <tbody>
                            <td>{unit.name}</td>
                            <td>{unit.type}</td>
                            <td>{unit.unit_length + 'm'}</td>
                            <td>{unit.unit_width + 'm'}</td>
                            <td>{unit.unit_height + 'm'}</td>
                            <td>{unit.city_or_town}</td>
                            <td>{unit.status}</td>
                        </tbody>
                    )}
                </table> :
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
                    </div>}


            </div>

        </div>
        );
    }
}



export default MyUnits /*connect(mapStateToProps, mapDispatchToProps)*/;