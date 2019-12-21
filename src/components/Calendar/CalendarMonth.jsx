import React, { Component } from 'react';
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from 'date-fns';

export default class CalendarMonth extends Component {
    render() {
        const {
            currentMonth = new Date(),
            selectedDate = new Date(),
            exercises = [],
        } = this.props;

        let monthStart = startOfMonth(currentMonth);
        let monthEnd = endOfMonth(monthStart);
        let startDate = startOfWeek(monthStart);
        let endDate = endOfWeek(monthEnd);

        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        let exerciseDivs = [];
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                let count = 0;
                exercises.map(exercise => {
                    if (new Date(exercise.date).getDate() === day.getDate()) {
                        const key = exercise.exerciseType + count;
                        exerciseDivs.push(
                            <div className="calendarExercises" key={key}>
                                {exercise.exerciseType}
                            </div>
                        );
                        count = count + 1;
                    }
                });

                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, monthStart)
                                ? 'disabled'
                                : isSameDay(day, selectedDate)
                                ? 'selected'
                                : ''
                        }`}
                        key={day}
                        onClick={() => this.props.selectDate(cloneDay)}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                        {exerciseDivs}
                    </div>
                );
                day = addDays(day, 1);
                exerciseDivs = [];
            }
            rows.push(
                <div className="row month" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="body">{rows}</div>;
    }
}
