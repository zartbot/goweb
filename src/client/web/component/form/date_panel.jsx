import React from 'react';
import { Select, Row, Col } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as datepickActions, getDateRange } from "../../../_service/reduxstore/modules/filter";
import DatePick from './datepick.jsx';

const Option = Select.Option;


function GetSecondFromRange(rangestr) {
    switch (rangestr) {
        case "Last 5 minutes":
        return 60 * 5;
        case "Last 15 minutes":
            return 60 * 15;
        case "Last 30 minutes":
            return 60 * 30;
        case "Last 1 hour":
            return 3600;
        case "Last 4 hours":
            return 3600 * 4;
        case "Last 12 hours":
            return 3600 * 12;
        case "Last 24 hours":
            return 3600 * 24;
        case "Last 2 days":
            return 3600 * 24 * 2;
        case "Last 7 days":
            return 3600 * 24 * 7;
        default:
            return 0;
    }
}


class DatePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quickrangetext: this.props.daterange.get("quickrangetext"),
        };
    }

    onChangeSelect = (value) => {
        let quickrange = GetSecondFromRange(value);
        this.props.quickrange(quickrange, value);
        this.setState({
            quickrangetext: value
        });
    }

    render() {
        return (
            <div>
                <div style={{ "fontSize": "0.9em", "color": "black", "marginTop": "3px", "marginBottom": "5px", "textAlign": "right" }}>Quick Time Range</div>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box" />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Select defaultValue={this.state.quickrangetext} style={{ width: 200 }} onChange={this.onChangeSelect}>
                        <Option value="Last 5 minutes">Last 5 minutes</Option>
                        <Option value="Last 15 minutes">Last 15 minutes</Option>
                            <Option value="Last 30 minutes">Last 30 minutes</Option>
                            <Option value="Last 1 hour">Last 1 hour</Option>
                            <Option value="Last 4 hours">Last 4 hours</Option>
                            <Option value="Last 12 hours">Last 12 hours</Option>
                            <Option value="Last 24 hours">Last 24 hours</Option>
                            <Option value="Last 2 days">Last 2 days</Option>
                            <Option value="Last 7 days">Last 7 days</Option>
                        </Select>
                    </Col>
                    </Row>
                    <div style={{ "fontSize": "0.9em", "color": "black", "marginTop": "20px", "marginBottom": "5px", "textAlign": "right" }}>Absolute Time Range</div>
                    <DatePick />
            </div>
                );
            }
        }
        
const mapStateToProps = (state, props) => {
    return {
                    daterange: getDateRange(state)
            };
        };
        
const mapDispatchToProps = dispatch => {
    return {
                    ...bindActionCreators(datepickActions, dispatch)
                };
            };
            
            export default connect(mapStateToProps, mapDispatchToProps)(DatePanel);
            
