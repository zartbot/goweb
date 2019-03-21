import React            from 'react';
import { withApollo } from 'react-apollo';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';

import asyncComponent from '../../../_util/asyncComponent';
import LayoutContent from '../../component/layout/content';

class Home extends React.Component{
    render() {    
        return (
               <LayoutContent>Hello World.
   


      
               </LayoutContent>
        );
    } 
}
export default withApollo(Home);

 