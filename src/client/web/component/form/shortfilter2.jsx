import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DateRange from './daterange.jsx';

import { actions as datepickActions, getDateRange } from "../../../_service/reduxstore/modules/filter";

const Option = Select.Option;

class ShortFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorid: this.props.filterdata.get("query_sensorid"),
        };
    }

    onChangeIP = (e) => {
        this.setState({
            sensorid : e.target.value
        });
    }
      
    handleUpdate = (e) => {
        let result = {
            quickrange: this.props.filterdata.get("quickrange"),
            quickrangetext: this.props.filterdata.get("quickrangetext"),
            query_sensorid: this.state.sensorid,
            query_starttime: this.props.filterdata.get("starttime"),
            query_endtime:this.props.filterdata.get("endtime"),
        };
        this.props.updatefilter(result);
    }

    render() {
        return (
             <div style={{"float": "right"}} className="gutter-box" >
                 <Form layout="inline">
                     <Form.Item >
                         <Input type="text" style={{ width: 200 }} placeholder="SensorID" value={this.state.sensorid} onChange={this.onChangeIP} onPressEnter={this.handleUpdate}/> 
                     </Form.Item>

                     <Form.Item>
                         <Button type="primary" onClick={this.handleUpdate}>OK</Button>
                     </Form.Item>
                 </Form>
             </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
      filterdata: getDateRange(state)
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      ...bindActionCreators(datepickActions, dispatch)
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ShortFilter);
