import React            from 'react';
import {
    Sparkline,
    BarSeries,
    PatternLines
} from '@data-ui/sparkline';
import { allColors } from '@data-ui/theme'; // open-color colors


class SparkLineBar extends React.Component{
    render() {    

        return (
    <Sparkline
               ariaLabel="A line graph of randomly-generated data"
               margin={{ top: 5, right: 5, bottom: 0, left: 5,}}
               width={this.props.width}
               height={this.props.height}
               data={this.props.data}
               valueAccessor={datum => datum}
             >
               <BarSeries
                 showArea ={false}
                 stroke={allColors.blue[7]}
               />
               

        </Sparkline>);
    }
}

export default SparkLineBar;


/*
               <PointSeries
                 points={['min', 'max']}
                 fill={allColors.grape[3]}
                 size={5}
                 stroke="#fff"
                 renderLabel={val => val.toFixed(2)}
        />
*/