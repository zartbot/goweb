import React from 'react';
import socketIOClient from "socket.io-client";
import  WebsocketURI  from  '../../../../_api';
import XtermContainer from './xterm.jsx';


const socket = socketIOClient(WebsocketURI);

class XtermApp extends React.Component {

    constructor(props) {
        super(props);
        
        this.term1 = null;
        
    }

    componentDidMount() {
        let term = this.term1.getTerm();
        term.on("data", function(data) {
            socket.emit('msg', data);
        });
        socket.on("msg", function (data) {
            console.log(data);
            term.write(data);
        });
    }


    render() {
        return <div>
                    <XtermContainer ref={(term1) => {this.term1 = term1;}} id="msg"/>
                </div>;

    }
}


export default XtermApp;

