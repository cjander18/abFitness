import React, { Component } from 'react';
import TimeField from 'react-simple-timefield';
import { addLeadingZero } from '../../utils/utils';

export default class TimeInput extends Component {
    render() {
        return (
            <div className="oneLineInputDiv">
                <div className="labelDiv">
                    <label
                        className={this.props.error ? 'error-text' : ''}
                        htmlFor={this.props.id}
                    >
                        {this.props.label}
                    </label>
                </div>
                <TimeField
                    id={this.props.id}
                    name={this.props.id}
                    title={this.props.title}
                    className="timerTimeSet timerTimeStart"
                    value={`${addLeadingZero(
                        this.props.hours
                    )}:${addLeadingZero(this.props.minutes)}:${addLeadingZero(
                        this.props.seconds
                    )}`}
                    onChange={this.props.timeChange}
                    aria-placeholder={this.props.ariaPlaceholder}
                    showSeconds
                    contentEditable
                />
            </div>
        );
    }
}
