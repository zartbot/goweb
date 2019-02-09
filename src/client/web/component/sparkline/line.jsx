import React            from 'react';
import {
    Sparkline,
    LineSeries,
    HorizontalReferenceLine,
    BandLine,
    PatternLines,
    PointSeries } from '@data-ui/sparkline';
import { allColors } from '@data-ui/theme'; // open-color colors


class SparkLine extends React.Component{
    render() {    

        return (
    <Sparkline
               ariaLabel="A line graph of randomly-generated data"
               margin={{ top: 5, right: 5, bottom: 0, left: 5,}}
               width={200}
               height={50}
               data={this.props.data}
               valueAccessor={datum => datum}
             >
               {/* this creates a <defs> referenced for fill */}
               <PatternLines
                 id="unique_pattern_id"
                 height={2}
                 width={2}
                 stroke={allColors.grape[6]}
                 strokeWidth={1}
                 orientation={['diagonal']}
               />
               {/* display innerquartiles of the data 
            
               <BandLine
                 band="innerquartiles"
                 fill="url(#unique_pattern_id)"
               />
            
            */}
            
               {/* display the median */}
               <HorizontalReferenceLine
                 stroke={allColors.grape[8]}
                 strokeWidth={1}
                 strokeDasharray="4 4"
                 reference="median"
               />
               {/* Series children are passed the data from the parent Sparkline */}
               <LineSeries
                 showArea ={false}
                 stroke={allColors.grape[7]}
               />
               
            {/*}   <PointSeries
                 points={['min', 'max']}
                 fill={allColors.grape[3]}
                 size={5}
                 stroke="#fff"
                 renderLabel={val => val.toFixed(2)}
        />*/}
        </Sparkline>);
    }
}

export default SparkLine;
