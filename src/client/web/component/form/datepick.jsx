import React from 'react';
import { DatePicker } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Moment from 'moment';

 
import { actions as datepickActions, getDateRange } from "../../../_service/reduxstore/modules/filter";

class DateRange extends React.Component {
    state = {
      startValue: null,
      endValue: null,
      endOpen: false,
    };

    static getDerivedStateFromProps(nextProps,prevState) {
        
        if ( (prevState.startValue == null) || (prevState.endValue== null) ) {
            let now = Math.trunc(new Date().getTime() / 1000);
            let starttime = nextProps.daterange.get("starttime");
            let endtime = nextProps.daterange.get("endtime");
          return {
            startValue: Moment().seconds(starttime-now),
            endValue: Moment().seconds(endtime-now),
          };
        } else {
          return null;
        }
      }

     
    disabledStartDate = (startValue) => {
      const endValue = this.state.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    }
  
    disabledEndDate = (endValue) => {
      const startValue = this.state.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return endValue.valueOf() <= startValue.valueOf();
    }
  
    onChange = (field, value) => {
      this.setState({
        [field]: value,
      });
    }
  
    onStartChange = (value) => {
      this.onChange('startValue', value);
      this.props.starttime(Math.trunc(value.valueOf()/1000));
    }
  
    onEndChange = (value) => {
      this.onChange('endValue', value);
      this.props.endtime(Math.trunc(value.valueOf()/1000));
      
    }
  
    handleStartOpenChange = (open,value) => {
      if (!open) {
        this.setState({ endOpen: true });
      }
    }
  
    handleEndOpenChange = (open,value) => {
      this.setState({ endOpen: open });     
    }
  
    render() {
      const { startValue, endValue, endOpen } = this.state;
      return (
        <div>
          <DatePicker
            disabledDate={this.disabledStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={startValue}
            placeholder="Start"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
           <span>  ->  </span><DatePicker
            disabledDate={this.disabledEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={endValue}
            placeholder="End"
            onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
          />
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
  
export default connect(mapStateToProps, mapDispatchToProps)(DateRange);

