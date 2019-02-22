
import React from 'react';
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';

let default_option = {
    title: {
        text: ''
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    animation: false,
    legend: {
        data: [],
        show: true
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {            
            dataView:{
                title: "dataview",
                lang: ['dataview', 'close', 'refresh'],
            },
            magicType: {
                title:{
                    line:'line',
                    bar:'bar',
                    stack:'stack',
                    tiled:'tiled',
                },
                type: ['line', 'bar', 'stack', 'tiled']
            },            saveAsImage: {
                title:'save as image',
            }
        },
        right:"40px"
    },
    xAxis: {
        type: 'category', 
        boundaryGap: true,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
};



export default class TimeSeriesLine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

        let option = new Object();
        option = default_option;
        option.title.text = this.props.title;
        option.legend.data = this.props.legend;
        option.xAxis.data = this.props.xAxis;
        option.yAxis.name = this.props.yAxisName;

        let data = this.props.data;
        let idx = 0;

        option.series =[];
        if (data instanceof Array) {
            data.map((orig) => {
                let item = new Object();
                item.name = this.props.legend[idx];
                item.type = 'line';
                if (this.props.stack == "enable") {
                    item.stack = "sum";
                } else {
                    item.stack = this.props.legend[idx];
                }
                if (this.props.type == "bar") {
                    item.type='bar';
                    item.itemStyle = new Object();

                item.large = true;
                item.itemStyle.opacity = 0.9;
                } else {
                    item.symbol ="none";
                    item.smooth = false;
                    item.lineStyle = new Object();
                    item.lineStyle.opacity = 0.8;
                    item.lineStyle.width = 1.5;
                    
                }
                if (this.props.type == "area") {
                    let areaobj = new Object();
                    areaobj.opacity = 0.3;
                    item.areaStyle = areaobj;
                }
                item.data = orig;


                option.series.push(item);
                idx++;
            });
        }
        if (idx > 0) {
        if (this.props.showtotal == "enable"){
            let label = new Object();
            label.normal = new Object();
            label.normal.show = true;
            label.normal.position = 'top';            
            option.series[idx-1].label = label;
          }
        }

        //设置options
        myChart.setOption(option);
        window.onresize = function () {
            myChart.resize();
        };
    }

    render() {
        const { width = "100%", height } = this.props;
        return <div ref={ID => this.ID = ID} style={{ width, height }}/>;
    }
}

