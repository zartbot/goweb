import React from "react";
import { Terminal } from 'xterm';
import * as attach from 'xterm/lib/addons/attach/attach';
import * as fit from 'xterm/dist/addons/fit/fit';
import "xterm/dist/xterm.css";
import "xterm/dist/addons/fullscreen/fullscreen.css";


class XtermContainer extends React.Component {
    constructor(props) {
        super(props);
        this.getTerm = this.getTerm.bind(this);
    }

    componentDidMount() {
        Terminal.applyAddon(fit);
        Terminal.applyAddon(attach); 
        let {id} = this.props;
        let terminalContainer = document.getElementById(id);
        this.term = new Terminal({cursorBlink: true});
        this.term.open(terminalContainer);
        this.term.fit();
    }

    getTerm() {
        return this.term;
    }

    render() {
        return <div id={this.props.id} />;
    }

}

export default XtermContainer;
