import React, { Component } from 'react';
import Timer from './Timer';

export default class Main extends Component {
    render() {
        return <Timer userSession={this.props.userSession}></Timer>;
    }
}
