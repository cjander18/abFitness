import React, { Component } from 'react';
import CalendarDay from './CalendarDay';
import CalendarWeek from './CalendarWeek';
import CalendarMonth from './CalendarMonth';
import { calendarTypes } from '../../utils/Constants';

export default class CalendarDates extends Component {
    render() {
        const { calendarType = '', selectedDate = new Date() } = this.props;

        if (calendarType === calendarTypes.Day) {
            return (
                <div className="body day">
                    <div className="col" key={selectedDate}>
                        <CalendarDay
                            day={this.props.selectedDate}
                            firstDay={true}
                            calendarType={this.props.calendarType}
                            currentMonth={this.props.currentMonth}
                            selectDate={this.props.selectDate}
                            selectHour={this.props.selectHour}
                            selectedDate={this.props.selectedDate}
                            selectedHour={this.props.selectedHour}
                            showPopup={this.props.showPopup}
                            togglePopup={this.props.togglePopup}
                            exercises={this.props.exercises}
                        ></CalendarDay>
                    </div>
                </div>
            );
        } else if (calendarType === calendarTypes.Week) {
            return (
                <CalendarWeek
                    calendarType={this.props.calendarType}
                    currentMonth={this.props.currentMonth}
                    selectDate={this.props.selectDate}
                    selectHour={this.props.selectHour}
                    selectedDate={this.props.selectedDate}
                    selectedHour={this.props.selectedHour}
                    showPopup={this.props.showPopup}
                    togglePopup={this.props.togglePopup}
                    exercises={this.props.exercises}
                ></CalendarWeek>
            );
        } else if (calendarType === calendarTypes.Month) {
            return (
                <CalendarMonth
                    calendarType={this.props.calendarType}
                    currentMonth={this.props.currentMonth}
                    selectDate={this.props.selectDate}
                    selectedDate={this.props.selectedDate}
                    selectedHour={this.props.selectedHour}
                    showPopup={this.props.showPopup}
                    togglePopup={this.props.togglePopup}
                    exercises={this.props.exercises}
                ></CalendarMonth>
            );
        } else if (calendarType === calendarTypes.Year) {
        } else if (calendarType === calendarTypes.Schedule) {
        } else if (calendarType === calendarTypes.SevenDay) {
        }

        return (
            <CalendarMonth
                calendarType={this.props.calendarType}
                currentMonth={this.props.currentMonth}
                selectDate={this.props.selectDate}
                selectedDate={this.props.selectedDate}
                selectedHour={this.props.selectedHour}
                showPopup={this.props.showPopup}
                togglePopup={this.props.togglePopup}
                exercises={this.props.exercises}
            ></CalendarMonth>
        );
    }
}
