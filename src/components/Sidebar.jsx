import React, { Component } from 'react';

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebarInner">
                <button
                    className="sidebarItem"
                    onClick={() => this.props.selectTab('Home')}
                >
                    Home
                </button>
                <button
                    className="sidebarItem"
                    onClick={() => this.props.selectTab('Timer')}
                >
                    Timer
                </button>
                <button
                    className="sidebarItem"
                    onClick={() => this.props.selectTab('Lifting')}
                >
                    Lifting
                </button>
                <button
                    className="sidebarItem"
                    onClick={() => this.props.selectTab('Running')}
                >
                    Running
                </button>
            </div>
        );
    }
}
