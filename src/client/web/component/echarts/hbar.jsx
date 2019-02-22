
import React from 'react';
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/bar';

let default_option = {
    title: {
        text: ''
    },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
    animation: false,
    legend: {
        data: [],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        name:'',
    },
    yAxis: {
        type: 'category',
        data: [],
    },
    series: []
};



export default class HBar extends React.Component {

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
        option.xAxis.name = this.props.unit;
        option.yAxis.data = [];

        let data = this.props.data;
        
        option.series =[];
        
        option.legend.data.map((value)=>{
            let item = new Object();
            item.name = value;
            item.type = 'bar';
            item.stack = "sum";
            item.data  =[];
            item.itemStyle = new Object();
            item.large = true;
            item.itemStyle.opacity = 0.9;
            option.series.push(item);
        });

        if (data instanceof Array) {
            data.map((orig) => {
                for (let idx = 0 ;idx < option.series.length ; idx++){
                    option.series[idx].data.push(orig.value[idx]);
                }
                option.yAxis.data.push(orig.key);
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

