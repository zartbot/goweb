import React from 'react';
import socketIOClient from "socket.io-client";
import Content from '../../component/layout/content';
import ws_uri_hdr  from '../../../_api';
import XtermContainer from '../../component/xterm/xterm.jsx';



//const socket = socketIOClient(WebsocketURI);

const websocket = new WebSocket(ws_uri_hdr.ws_uri_hdr+"/api/vty");

class XtermApp extends React.Component {

    constructor(props) {
        super(props);
        
        this.term1 = null;

    }

    componentDidMount() {
        let term = this.term1.getTerm();

        

        term.attach(websocket, true,true);
        
        
    }


    render() {
        return <Content>
            <XtermContainer ref={(term1) => { this.term1 = term1; }} id="msg" />
        </Content>;

    }
}


export default XtermApp;

