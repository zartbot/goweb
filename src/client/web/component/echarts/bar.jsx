import React from 'react';
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/bar';

export default class BarReact extends React.Component {
  
  constructor(props) {
    super(props);
    this.initPie = this.initPie.bind(this);
  }
  
 
  
  componentDidMount() {
    this.initPie();
  }
  componentDidUpdate() {
    this.initPie();
  }
  

  initPie() {
    const { option={} } = this.props; //外部传入的data数据
    let myChart = echarts.init(this.ID); //初始化echarts
    
    //设置options
    myChart.setOption(option);
    window.onresize = function() {
      myChart.resize();
    };
  }
  

  render() {
    const { width="100%", height="200px"} = this.props;
    return <div ref={ID => this.ID = ID} style={{width, height}} />;
  }
} 