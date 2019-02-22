
import React from 'react';
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/gauge';

let color_0 = new echarts.graphic.LinearGradient(0, 0, 1, 1,[{offset: 0, color: '#7fcb19'}, {offset:1,color: '#0aca3f'}]);
let color_1 = new echarts.graphic.LinearGradient(0, 0, 1, 1,[{offset: 0, color: '#ff8a00'}, {offset:1,color: '#ffc000'}]);
let color_2 = new echarts.graphic.LinearGradient(0, 0, 1, 1,[{offset: 0, color: '#ed4500'}, {offset:1,color: '#ff8a00'}]);
let color_3 = new echarts.graphic.LinearGradient(0, 0, 1, 1,[{offset: 0, color: '#be19cb'}, {offset:1,color: '#ed4500'}]);
let color_4 = new echarts.graphic.LinearGradient(0, 0, 1, 1,[{offset: 0, color: '#a70213'}, {offset:1,color: '#be19cb'}]);
let color_5 = new echarts.graphic.LinearGradient(0, 0, 1, 1,[{offset: 0, color: '#a70213'}, {offset:1,color: '#be19cb'}]);


let asc_option = {
    backgroundColor: '#fff',
    series: [
        {
            name: '',
            type: 'gauge',
            radius: '100%',
            animationDuration: 6000,
            animationThreshold: 8000,
            animationDelay: 10,
            startAngle: 195,
            endAngle: -15,
            axisLine: {
                show: true,
                lineStyle: {
                    color: [[0, '#eee'], [1, '#eee']],
                }
            },
            splitLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false},
            splitLabel: {show: false},
            pointer: {show: false},
            itemStyle: {
                borderWidth: 30,
                color: '#000',
            },
            title: {
                offsetCenter: [0, '-20%'],
                color: '#777',
                fontSize: 40,
                fontWeight: 700
            },
            detail: {
                formatter: function(e){
                     return  detectDataLevel(e,"asc");
                },
                color: '#fff',
                offsetCenter: [0, '35%'],
                backgroundColor : 'orange',
                borderRadius : 8,
                padding: 10,
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 15
            },
            data: [{value: '0', name: 'gauge'}]
        }
    ],
};

function detectDataLevel(pct,render_mode) {
    let level = "";
    if (render_mode == "asc") {
        switch(true) {
          case ( pct > 90.0):
              level = "Execellent";
              break;
          case ( pct > 70.0):
              level = "Good";
              break;
          case ( pct > 60.0):
            level = "Average";
            break;              
          case ( pct > 30.0):
              level = "Poor";
              break;
          case ( pct > 15.0):
              level = "Dissatisfied";
              break;              
          default:
              level = "Very Dissatisfied";
        }      
    } else if (render_mode == "desc") {
        switch(true) {
            case ( pct > 90.0):
                level = "Very Dissatisfied";
                break;
            case ( pct > 80.0):
                level = "Dissatisfied";
                break;
            case ( pct > 70.0):
                level = "Poor";
                break;
            case ( pct > 60.0):
                level = "Average";
                break;
            case ( pct > 30.0):
                level = "Good";
                break;            
            default:
               level = "Execellent";
          }    
    }
    return level;
}




function detectDataType(pct,render_mode) {
    let color = new Object();
    let level = "";
    if (render_mode == "asc") {
        switch(true) {
          case ( pct > 90.0):
              color = color_0;
              level = "Execellent";
              break;
          case ( pct > 70.0):
              color = color_1; 
              level = "Good";
              break;
          case ( pct > 60.0):
            color = color_2;
            level = "Average";
            break;              
          case ( pct > 30.0):
              color = color_3;
              level = "Poor";
              break;
          case ( pct > 15.0):
              color = color_4;          
              level = "Dissatisfied";
              break;              
          default:
              color = color_5;
              level = "Very Dissatisfied";
        }      
    } else if (render_mode == "desc") {
        switch(true) {
            case ( pct > 90.0):
                color = color_5;            
                level = "Very Dissatisfied";
                break;
            case ( pct > 80.0):
                color = color_4;            
                level = "Dissatisfied";
                break;
            case ( pct > 70.0):
                color = color_3;
                level = "Poor";
                break;
            case ( pct > 60.0):
                color = color_2;
                level = "Average";
                break;
            case ( pct > 30.0):
                color = color_1;
                level = "Good";
                break;            
            default:
                color = color_0;
                level = "Execellent";
          }    
    }
    return { 
        color: color,
        level:level
    };
}

export default class GaugeReact extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        color: color_0,
        level: "",
    };
    this.initPie = this.initPie.bind(this);
  }

  componentDidMount() {
    this.initPie();
  }
  componentDidUpdate() {
    this.initPie();
  }
  

  initPie() {
    let myChart = echarts.init(this.ID); //初始化echarts
    let pct = this.props.pct;
    if (pct > 100 ) { pct = 100;}
    if (pct < 0) {pct =0;}

    let option = asc_option;
    if (this.props.render_mode == "desc") {
        option.detail.formatter = function(e){return  detectDataLevel(e,"asc");};
    }
    let {color,level} = detectDataType(pct,this.props.render_mode);
    let height = this.props.height;
    height = parseInt(height.slice(0,-2));
    let value = this.props.value;
    option.series[0].itemStyle.borderWidth = 30* height/300;
    option.series[0].title.fontSize = 40* height/300;
    option.series[0].detail.fontSize = 20* height/300;
    option.series[0].data[0].value = value;
    option.series[0].data[0].name = value;
    option.series[0].detail.backgroundColor = color.colorStops[1].color;
    option.series[0].axisLine.lineStyle.color[0][0] = pct / 100;
    option.series[0].axisLine.lineStyle.color[0][1] = color;
       //设置options
    myChart.setOption(option);
    window.onresize = function() {
      myChart.resize();
    };
  }

   render() {
    const { width="100%" ,height} = this.props;
    return <div ref={ID => this.ID = ID} style={{width, height}} />;
  }
} 

