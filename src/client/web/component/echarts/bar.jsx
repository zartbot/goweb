
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
            },
            saveAsImage: {
                title:'save as image',
            }
        },

        right:"40px"
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
           
        },
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
};



export default class TimeSeriesBar extends React.Component {

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

        let option = default_option;
        option.title.text = this.props.title;
        option.legend.data = this.props.legend;
        option.xAxis.data = this.props.xAxis;
        option.yAxis.name = this.props.yAxisName;
        if (this.props.yscale == "enable") {
            option.yAxis.scale = true;
        } else {
            option.yAxis.scale = false;
        }
        let data = this.props.data;
        let idx = 0;
        option.series =[];
        if (data instanceof Array) {
            data.map((orig) => {
                let item = new Object();
                item.name = this.props.legend[idx];
                item.type = 'bar';
                if (this.props.stack == "enable") {
                    item.stack = "sum";
                } else {
                    item.stack = this.props.legend[idx];
                }
                item.data = orig;
                option.series.push(item);
                idx++;
            });
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

