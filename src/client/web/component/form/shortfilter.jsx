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
            groupby: this.props.filterdata.get("groupby"),
            agentid: this.props.filterdata.get("query_agentid"),
        };
    }

    onChangeIP = (e) => {
        this.setState({
            agentid : e.target.value
        });
    }
      
    onChangeSelect = (value) => {
        this.props.groupby(value);
        let result = {
            quickrange: this.props.filterdata.get("quickrange"),
            quickrangetext: this.props.filterdata.get("quickrangetext"),
            query_agentid: this.state.agentid,
            query_groupby: value,
            query_starttime: this.props.filterdata.get("starttime"),
            query_endtime:this.props.filterdata.get("endtime"), 
        };
        this.props.updatefilter(result);
        this.setState({
            groupby: value
        });
    }

    handleUpdate = (e) => {
        let result = {
            quickrange: this.props.filterdata.get("quickrange"),
            quickrangetext: this.props.filterdata.get("quickrangetext"),
            query_agentid: this.state.agentid,
            query_groupby: this.props.filterdata.get("groupby"),
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
                         <Input type="text" style={{ width: 200 }} placeholder="AgentIP" value={this.state.agentid} onChange={this.onChangeIP} onPressEnter={this.handleUpdate}/> 
                     </Form.Item>
                     <Form.Item>
                         <Select defaultValue={this.state.groupby} style={{ width: 200 }} onChange={this.onChangeSelect} >
                             <Option value="ApplicationName">ApplicationName</Option>
                             <Option value="ApplicationCategory">ApplicationCategory</Option>
                             <Option value="TrafficClass">TrafficClass</Option>
                             <Option value="BizRelevance">BusinessRelevance</Option>
                             <Option value="SubCategory">SubCategory</Option>
                             <Option value="Destination_City">City</Option>
                             <Option value="Destination_Region">Region</Option>
                             <Option value="Destination_Country">Country</Option>
                             <Option value="Destination_ASN">ServiceProvider</Option>
                             <Option value="Destination_Geo_Location">GeoLocation</Option>
                             <Option value="Interface">Interface</Option>
                         </Select>
                     </Form.Item>
                     <Form.Item>
                         <DateRange />
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
/*
                             <Option value="Source_City">City(LAN)</Option>
                             <Option value="Source_Region">Region(LAN)</Option>
                             <Option value="Source_Country">Country(LAN)</Option>
                             <Option value="Source_ASN">ISP(LAN)</Option>
                             <Option value="Destination_City">City(WAN)</Option>
                             <Option value="Destination_Region">Region(WAN)</Option>
                             <Option value="Destination_Country">Country(WAN)</Option>
                             <Option value="Destination_ASN">ISP(WAN)</Option>
                             */