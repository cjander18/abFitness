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
                            selectDate={this.props.selectDate}
                            selectHour={this.props.selectHour}
                            selectedDate={this.props.selectedDate}
                            selectedHour={this.props.selectedHour}
                            updateDateRange={this.props.updateDateRange}
                            showPopup={this.props.showPopup}
                            togglePopup={this.props.togglePopup}
                            exercises={this.props.exercises}
                            updateExercises={this.props.updateExercises}
                        ></CalendarDay>
                    </div>
                </div>
            );
        } else if (calendarType === calendarTypes.Week) {
            return (
                <CalendarWeek
                    calendarType={this.props.calendarType}
                    selectDate={this.props.selectDate}
                    selectHour={this.props.selectHour}
                    selectedDate={this.props.selectedDate}
                    selectedHour={this.props.selectedHour}
                    updateDateRange={this.props.updateDateRange}
                    showPopup={this.props.showPopup}
                    togglePopup={this.props.togglePopup}
                    exercises={this.props.exercises}
                    updateExercises={this.props.updateExercises}
                ></CalendarWeek>
            );
        } else if (calendarType === calendarTypes.Month) {
            return (
                <CalendarMonth
                    calendarType={this.props.calendarType}
                    selectDate={this.props.selectDate}
                    selectedDate={this.props.selectedDate}
                    selectedHour={this.props.selectedHour}
                    updateDateRange={this.props.updateDateRange}
                    showPopup={this.props.showPopup}
                    togglePopup={this.props.togglePopup}
                    exercises={this.props.exercises}
                    updateExercises={this.props.updateExercises}
                ></CalendarMonth>
            );
        } else if (calendarType === calendarTypes.Year) {
        } else if (calendarType === calendarTypes.Schedule) {
        } else if (calendarType === calendarTypes.SevenDay) {
        }

        return (
            <CalendarMonth
                calendarType={this.props.calendarType}
                selectDate={this.props.selectDate}
                selectedDate={this.props.selectedDate}
                selectedHour={this.props.selectedHour}
                updateDateRange={this.props.updateDateRange}
                showPopup={this.props.showPopup}
                togglePopup={this.props.togglePopup}
                exercises={this.props.exercises}
                updateExercises={this.props.updateExercises}
            ></CalendarMonth>
        );
    }
}
