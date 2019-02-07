import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
import BusinessNavbar from './business-navbar'

class Units extends Component {
    constructor() {
        super();
        this.state = {
            blocks: [],
            unitTypes: [],
            unitName: '',
            unitType: '',
            block: '',
        }
        this.handleInput = this.handleInput.bind(this)
        this.submitData = this.submitData.bind(this)
    }
    async componentDidMount() {
        var blocks = await axios.get('http://localhost:3001/blocks');
        var unitTypes = await axios.get('http://localhost:3001/types');
        console.log('unitTypes :', unitTypes);
        var arrBlocks = [];
        var arrUnitTypes = [];
        unitTypes.data.forEach(item => arrUnitTypes.push([item.id, item.type,
        `(h: ${item.unit_height}m ,l: ${item.unit_length}m ,w: ${item.unit_width}m)`
        ]))
        blocks.data.forEach(item => arrBlocks.push([item.id, item.block_name]))
        this.setState({ blocks: arrBlocks, unitTypes: arrUnitTypes })
    }

    handleSelect(target, value) {
        let change = {};
        change[target] = value;
        this.setState(change);
    }
    handleInput(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    submitData(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/unit',
            {
                unitName: this.state.unitName,
                unitType: this.state.unitType,
                block: this.state.block
            })
    }
    gotoNext() {
        window.location.set('/myunits')
    }

    render() {
        return (<div>
            <BusinessNavbar />
            <div className={'container'}>

                <center>
                    <h3>Unit Details</h3>
                </center>
                <div style={{ marginLeft: 35 + '%' }} className={'my-container form-pos container'}>

                    <form className={'unit-form container'}>
                        <label>Block Name </label>
                        <select>
                            <option value={'select block'}>select block</option>
                            {this.state.blocks.map((block, i = 0) => <option key={block + i++} value={block} onClick={() => this.handleSelect('block', block)}>{`${block[0]}. ${block[1]}`}</option>)}
                        </select>

                        <label>Unit type</label>
                        <select>
                            <option value={'select unit-type'}>select unit-type</option>
                            {this.state.unitTypes.map((unitType, i = 0) => <option key={unitType + i++} value={unitType} onClick={() => this.handleSelect('unitType', unitType)}>{`${unitType[0]}. ${unitType[1]}${unitType[2]}`}</option>)}
                        </select>

                        <label>Unit Name </label>
                        <div  className={'block-setting'}>
                            <input placeholder="Unit Name" type='text' name='unitName' onChange={this.handleInput} value={this.state.telephone} />
                            <button style={{width:45+'%'}}className={'btn btn-default'} onClick={this.submitData}>Add</button>
                        </div>
                    </form>
                    <div style={{ marginLeft: 4 + '%' }} className={'block-btn-setting'}>
                        <button className={'btn btn-default'} >Cancel</button>
                        <button className={'btn btn-default'} >Done</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Units;