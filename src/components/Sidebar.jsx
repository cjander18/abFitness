import React, { Component } from 'react';

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebarInner">
                <button
                    className={`sidebarItem${
                        this.props.selectedTab === 'Home' ? ' selected' : ''
                    }`}
                    onClick={() => this.props.selectTab('Home')}
                >
                    Home
                </button>
                <button
                    className={`sidebarItem${
                        this.props.selectedTab === 'Lifting' ? ' selected' : ''
                    }`}
                    onClick={() => this.props.selectTab('Lifting')}
                >
                    Lifting
                </button>
                <button
                    className={`sidebarItem${
                        this.props.selectedTab === 'Timer' ? ' selected' : ''
                    }`}
                    onClick={() => this.props.selectTab('Timer')}
                >
                    Timer
                </button>
            </div>
        );
    }
}
