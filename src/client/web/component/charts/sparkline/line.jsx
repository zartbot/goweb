import React from 'react';
import {
  Sparkline,
  LineSeries,
  HorizontalReferenceLine,
  BandLine,
  PatternLines,
  PointSeries
} from '@data-ui/sparkline';
import { allColors } from '@data-ui/theme'; // open-color colors

class SparkLine extends React.Component {
  render() {
    return (
      <Sparkline
        ariaLabel="A line graph of randomly-generated data"
        margin={{ top: 5, right: 5, bottom: 0, left: 5, }}
        width={this.props.width}
        height={this.props.height}
        data={this.props.data}
        valueAccessor={datum => datum}
      >
        <HorizontalReferenceLine
          stroke={allColors.blue[4]}
          strokeWidth={1}
          strokeDasharray="3 5"
          reference="median"
        />
        <LineSeries
          showArea={false}
          stroke={allColors.blue[7]}
          strokeWidth={1.5}
        />
      </Sparkline>);
  }
}

export default SparkLine;


/*
        <PatternLines
          id="unique_pattern_id"
          height={2}
          width={2}
          stroke={allColors.grape[6]}
          strokeWidth={1}
          orientation={['diagonal']}
        />


<BandLine
                 band="innerquartiles"
                 fill="url(#unique_pattern_id)"
               />



                 <PointSeries
                 points={['min', 'max']}
                 fill={allColors.grape[3]}
                 size={5}
                 stroke="#fff"
                 renderLabel={val => val.toFixed(2)}
        />
*/