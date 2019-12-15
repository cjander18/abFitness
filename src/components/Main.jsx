import React, { Component } from 'react';
import Timer from './Timer';

export default class Main extends Component {
    render() {
        switch (this.props.selectedTab) {
            case 'Home':
                return <Timer></Timer>;
            case 'Exercise':
                return <Timer></Timer>;
            case 'Timer':
                return <Timer></Timer>;
            default:
                return <Timer></Timer>;
        }
    }
}
