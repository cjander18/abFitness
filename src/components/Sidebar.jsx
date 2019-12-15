import React, { Component } from 'react';

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebarInner">
                <a
                    className={`sidebarItem${
                        this.props.selectedTab === 'Home' ? ' selected' : ''
                    }`}
                    onClick={() => this.props.selectTab('Home')}
                >
                    Home
                </a>
                <a
                    className={`sidebarItem${
                        this.props.selectedTab === 'Exercise' ? ' selected' : ''
                    }`}
                    onClick={() => this.props.selectTab('Exercise')}
                >
                    Exercise
                </a>
                <a
                    className={`sidebarItem${
                        this.props.selectedTab === 'Timer' ? ' selected' : ''
                    }`}
                    onClick={() => this.props.selectTab('Timer')}
                >
                    Timer
                </a>
            </div>
        );
    }
}
