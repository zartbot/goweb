import React            from 'react';
import { withApollo } from 'react-apollo';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';

import asyncComponent from '../../../_util/asyncComponent';
import LayoutContent from '../../component/layout/content';

const Topology = asyncComponent(() => import(/* webpackChunkName: "Topology" */'../../component/topology/topology.jsx')); //柱状图组件

class Home extends React.Component{
    render() {    
        return (
               <LayoutContent>Hello World.
             <Topology/>


      
               </LayoutContent>
        );
    } 
}
export default withApollo(Home);

