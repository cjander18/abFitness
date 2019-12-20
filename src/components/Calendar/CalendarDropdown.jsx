import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const calendarTypes = ['Day', 'Week', 'Month', 'Year', 'Schedule', '7 Days'];

export default class CalendarDropDown extends Component {
    render() {
        //https://www.npmjs.com/package/react-dropdown
        return (
            <Dropdown
                options={calendarTypes}
                onChange={this.props.setCalendarType}
                value={this.props.calendarType}
                placeholder="Select an option"
            />
        );
    }
}
