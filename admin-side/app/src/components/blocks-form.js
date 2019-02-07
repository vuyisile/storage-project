import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
import { connect } from 'react-redux';
import { addInput } from '../actions/block-action'
import BusinessNavbar from './business-navbar'


class Blocks extends Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            blockName: '',
            location: '',
        }
        this.handleInput = this.handleInput.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    async componentDidMount() {
        try {
            var addresses = await axios.get('http://localhost:3001/locations');
            var data = addresses.data
            var locations = [];
            for (var i in data) {
                locations.push(`${data[i].address_line1}, ${data[i].address_line2}, ${data[i].city_or_town}, ${data[i].zip_code}`)
            }
            this.setState({ locations: locations })
        } catch (error) {
            console.log('error', error)
        }

    }
    handleInput(e) {
        let change = {};
        change['blockName'] = e.target.value;
        this.setState(change);
    }
    handleSelect(val) {
        this.setState({ location: val })
    }
    gotoNext() {
        if (window.location.pathname === '/block') {
            window.location.pathname = '/type';
        }
    }
    submitData(e) {
        e.preventDefault();
        this.props.submitBlock(this.state.blockName, this.state.location)
        if (this.state.location.length > 0) {
            axios.post('http://localhost:3001/block', this.state);
        } else {
            document.getElementById('error').innerText = 'please complete the form'

        }
    }
    render() {
        return (<div>
            <BusinessNavbar />
            <div style={{ marginLeft: 40 + '%' }} className={'my-container container form-pos'}>
                <form className={'block-form'}>
                    <label>Location</label>
                    <select className=''>
                        <div id='error'></div>
                        <option value={'select-location'}>select location</option>
                        {this.state.locations.map((location, i = 1) => <option value={this.state.location} key={'address' + i++} onClick={() => this.handleSelect(location)}>{location}</option>)}
                    </select>

                    <label>Block Name</label>
                    <div className={'block-setting'}>
                        <input placeholder={'Block Name'} type='text' name='block-name' onChange={this.handleInput} value={this.state.name} />
                        <button className='btn btn-default' onClick={this.submitData}>+Add</button>
                    </div>
                </form>
                <div className={'block-btn-setting'}>
                    <button className='btn btn-default' >Cancel</button>
                    <button className='btn btn-default' onClick={this.gotoNext}>Next</button>
                </div>
            </div>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitBlock: (block, location) => {
            dispatch(addInput(block, location))
        }
    }
}
const mapStateToProps = (state) => {
    return {
        state: state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Blocks);