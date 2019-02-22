import React from 'react';
import { Popover, Button } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actions as datepickActions, getDateRange } from "../../../_service/reduxstore/modules/filter";
import DatePanel from './date_panel.jsx';

const datepanel= (
    <DatePanel />
);

class DateRange extends React.Component {
    state = {
        showText: "",
        quickrange: 0,
        starttime: 0,
        endtime: 0, 
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if ( (prevState.showText == "") || (prevState.starttime != nextProps.daterange.get("starttime")) || (prevState.endtime != nextProps.daterange.get("endtime") )  || (prevState.quickrange != nextProps.daterange.get("quickrange") )) {
            let result = "";
            let quickrange = nextProps.daterange.get("quickrange");
            let quickrangetext = nextProps.daterange.get("quickrangetext");
            let starttime = nextProps.daterange.get("starttime");
            let endtime = nextProps.daterange.get("endtime");
            if (quickrange != 0) {
                result = quickrangetext;
            } else {
                let startdate = new Date(1000 * starttime);
                let enddate = new Date(1000 * endtime);
                result = startdate.toLocaleString() + " -> " + enddate.toLocaleString();
            }
            return {
                showText: result,
                quickrange: quickrange,
                starttime: starttime,
                endtime: endtime,
            };
        } else {
            return null;
        }
    }

    handleEndOpenChange = (open, value) => {
        this.setState({ endOpen: open });
    }

    render() {
        const text = this.state.showText;
        return (
            <Popover content={datepanel} placement="bottomRight"  trigger="click">
                <Button>{text}</Button>
            </Popover>
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

export default connect(mapStateToProps, mapDispatchToProps)(DateRange);

