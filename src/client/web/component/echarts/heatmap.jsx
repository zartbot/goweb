
import React from 'react';
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/heatmap';

let default_option = {
    tooltip:false,
    animation: true,
    grid: {
        height: '50%',
        y: '10%'
    },
    xAxis: {
        type: 'category',
        data: [],
    },
    yAxis: {
        type: 'category',
        data: [],
    },
    visualMap: {
        min: 1,
        max: 100,
        inRange: {
            color: ['#777777', 'red']
        },
        outOfRange: {
            color: ['#121122', 'rgba(3,4,5,0.4)', 'red']
        },
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
    },
    series: [{
        name: '',
        type: 'heatmap',
        data: [],
        label: {
            normal: {
                show: false
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 1,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};




export default class HeatMap extends React.Component {

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
        let xlabel = [];
        let xmap = new Map();
        let ylabel = [];
        let ymap = new Map();
        let data = this.props.data;
        let valuemax = 0;
        let valuemin = 0;
        let isFirst = true;
        if (data instanceof Array) {
            data.map((item) => {
                let xid = 0;
                let yid = 0;
                let x = item[0];
                let y = item[1];
                let value = item[2];
                if (isFirst) {
                    valuemax = value;
                    valuemin = value;
                    isFirst = false;
                } else {
                    if (value> valuemax ) {
                        valuemax = value
                    }
                    if (value < valuemin) {
                        valuemin = value
                    }
                }
                if (xmap.has(x)) {
                    xid = xmap.get(x);
                } else {
                    xid = xlabel.length();
                    xlabel.push(x);
                    xmap.set(x,xid);
                }
                if (ymap.has(y)) {
                    yid = ymap.get(y);
                } else {
                    yid = ylabel.length();
                    ylabel.push(y);
                    ymap.set(y,yid);
                }
                option.data.push([xid,yid,value]);
            });
        }
        option.xAxis.data= xlabel;
        option.yAxis.data= ylabel;
        if (this.props.autorange == "enable") {
            option.visualMap.min = valuemin;
            option.visualMap.max = valuemax;
        }
        //设置options
        myChart.setOption(option);
        window.onresize = function () {
            myChart.resize();
        };
    }

    render() {
        const { width = "100%", height } = this.props;
        return <div ref={ID => this.ID = ID} style={{ width, height }} key={this.props.title} />;
    }
}

