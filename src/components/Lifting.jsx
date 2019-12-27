import React, { Component } from 'react';
import LiftingCalendar from './Calendar/LiftingCalendar';
import { BlockstackUtils } from '../utils/Blockstack';
import { endOfMonth, startOfMonth } from 'date-fns';

export default class Lifting extends Component {
    constructor(props) {
        super(props);

        const currentMonth = new Date();
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);

        this.state = {
            dateRange: {
                startDate: monthStart,
                endDate: monthEnd,
            },
            exercises: [],
        };
    }

    async getSavedExercises() {
        await BlockstackUtils.getExercises().then(exercises => {
            console.log(exercises);
            this.setState({ exercises }, () =>
                console.log(`Exercises: ${this.state.exercises}`)
            );
        });
    }

    updateExercises = exercises => {
        this.setState({ exercises: exercises }, () =>
            console.log(`exercises: ${this.state.exercises}`)
        );
    };

    componentDidMount() {
        this.getSavedExercises();
    }

    updateDateRange = dateRange => {
        this.setState({ dateRange }, () => {
            console.log(
                `date range is from ${dateRange.startDate} to ${dateRange.endDate}`
            );
        });
        // if (calendarType === calendarTypes.Day) {
        // } else if (calendarType === calendarTypes.Week) {
        // } else if (calendarType === calendarTypes.Month) {
        // }
    };

    render() {
        return (
            <div className="lifting">
                <div className="blockDiv">
                    <LiftingCalendar
                        dateRange={this.state.dateRange}
                        exercises={this.state.exercises}
                        updateDateRange={this.updateDateRange}
                        updateExercises={this.updateExercises}
                        userSession={this.props.userSession}
                    ></LiftingCalendar>
                </div>
            </div>
        );
    }
}
