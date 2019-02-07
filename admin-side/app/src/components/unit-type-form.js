import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
import BusinessNavbar from './business-navbar'


class TypesOfUnits extends Component {
    constructor() {
        super();
        this.state = {
            unitType: '',
            length: '',
            height: '',
            width: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.submitData = this.submitData.bind(this)
    }

    handleSelect(val) {
        this.setState({ block: val })
    }
    handleInput(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    submitData(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/type', this.state)
    }
    gotoNext() {
        window.location.pathname = '/unit'
    }
    render() {
        return (<div>
            <BusinessNavbar />
            <center>
                <h3>Unit Details</h3>
            </center>

            <div className={'color container my-container form-pos'}>


                <form className={'unit-type'}>

                    <label>Unit type</label>

                    <input placeholder={'Unit type'} type='text' name='unitType' onChange={this.handleInput} value={this.state.email} />

                    <label>Unit Length (metres)</label>

                    <input placeholder={'Length'} type='text' name='length' onChange={this.handleInput} value={this.state.email} />

                    <label>Unit Width (metres)</label>

                    <input placeholder={'Width'} type='text' name='width' onChange={this.handleInput} value={this.state.email} />

                    <label>Unit Height (metres)</label>

                    <input placeholder={'Height'} type='text' name='height' onChange={this.handleInput} value={this.state.email} /><br />
                    <button className={'btn btn-default btn-add'} onClick={this.submitData}>Add</button>


                </form>
                <div className={'unit-type'}>
                    <button className='btn btn-default'>Cancel</button>
                    <button className='btn btn-default' onClick={() => this.gotoNext()}>Next</button>
                </div>
            </div>
        </div>
        );
    }
}

export default TypesOfUnits;