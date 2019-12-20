import React, { Component } from 'react';
import Timer from './Timer';
import Lifting from './Lifting';

export default class Main extends Component {
    render() {
        switch (this.props.selectedTab) {
            case 'Home':
                return <Lifting userSession={this.props.userSession}></Lifting>;
            case 'Lifting':
                return <Lifting userSession={this.props.userSession}></Lifting>;
            case 'Timer':
                return <Timer userSession={this.props.userSession}></Timer>;
            default:
                return <Timer userSession={this.props.userSession}></Timer>;
        }
    }
}
