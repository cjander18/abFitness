import React, { Component } from 'react';

export default class Button extends Component {
    render() {
        return (
            <div className="inlineButton">
                <button
                    id={this.props.id}
                    type="button"
                    className={this.props.className}
                    onClick={this.props.onClick}
                    disabled={this.props.disabled}
                    tabIndex="0"
                >
                    {this.props.children}
                </button>
            </div>
        );
    }
}
