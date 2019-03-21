
import React from 'react';
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/pie';

let default_option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        show: true,
        orient: 'vertical',
        x: 'right',
        data:[]
    },
    animation: false,
    series: [
        {
            name:'',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[

            ]
        }
    ]
};




export default class PieChart extends React.Component {

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
        option.legend.data = this.props.legend;
        option.series[0].name = this.props.title;

        let data = this.props.data;
        option.legend.data =[];
        option.series[0].data =[];
        if (data instanceof Array) {
            data.map((item) => {
                option.legend.data.push(item.name);
                option.series[0].data.push(item);
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
        return <div ref={ID => this.ID = ID} style={{ width, height }} key={this.props.title} />;
    }
}

