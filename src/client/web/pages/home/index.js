import React            from 'react';
import { withApollo } from 'react-apollo';


import asyncComponent from '../../../_util/asyncComponent';
import LayoutContent from '../../component/layout/content';


const BarReact = asyncComponent(() => import(/* webpackChunkName: "Bar" */'../../component/echarts/bar.jsx')); //柱状图组件
const SparkLine = asyncComponent(() => import(/* webpackChunkName: "SparkLine" */'../../component/sparkline/line.jsx')); //柱状图组件
const barOption = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '60%',
        data:[10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };


class Home extends React.Component{
    render() {    
        const data = Array(25).fill().map(Math.random);
        return (
               <LayoutContent>Hello World.<SparkLine data = {data}/> haha
             <BarReact option={barOption} />
            
               </LayoutContent>
        );
    } 
}
export default withApollo(Home);

