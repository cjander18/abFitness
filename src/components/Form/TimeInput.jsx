import React, { Component } from 'react';

export default class TimeInput extends Component {
    render() {
        return (
            <div className="oneLineInputDiv">
                <div className="labelDiv">
                    <label htmlFor={this.props.hourId}>
                        {this.props.hourLabel}
                    </label>
                </div>
                <input
                    id={this.props.hourId}
                    name={this.props.hourId}
                    type="number"
                    placeholder="h"
                    title={this.props.hourTitle}
                    className="timerTimeSet timerTimeStart"
                    size="2"
                    value={this.props.hours}
                    onChange={this.props.hoursChange}
                ></input>
                :
                <input
                    id={this.props.minuteId}
                    name={this.props.minuteId}
                    type="number"
                    placeholder="m"
                    title={this.props.minuteTitle}
                    className="timerTimeSet timerTimeMiddle"
                    size="2"
                    value={this.props.minutes}
                    onChange={this.props.minutesChange}
                ></input>
                :
                <input
                    id={this.props.secondId}
                    name={this.props.secondId}
                    type="number"
                    placeholder="s"
                    title={this.props.secondTitle}
                    className="timerTimeSet timerTimeMiddle"
                    size="2"
                    value={this.props.seconds}
                    onChange={this.props.secondsChange}
                ></input>
            </div>
        );
    }
}
