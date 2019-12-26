import React, { Component } from 'react';
import {
    addDays,
    compareAsc,
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
        const { selectedDate = new Date(), exercises = [] } = this.props;

        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(selectedDate);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        // this.props.updateDateRange({ startDate, endDate });

        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                let count = 0;
                const exerciseDivs = exercises.map(exercise => {
                    if (compareAsc(new Date(exercise.date), day) === 0) {
                        const key = exercise.exerciseType + count;
                        const pluralSets = exercise.sets > 1;
                        const pluralReps = exercise.repetitions > 1;
                        const tooltipText = `${exercise.sets} ${
                            pluralSets ? 'sets' : 'set'
                        } of ${exercise.repetitions} ${
                            pluralReps ? 'reps' : 'rep'
                        } at ${exercise.weightLifted}lbs`;
                        count = count + 1;
                        return (
                            <div
                                className="calendarExercises"
                                key={key}
                                onClick={this.props.togglePopup}
                            >
                                {exercise.exerciseType}
                                <span class="tooltip-text">{tooltipText}</span>
                            </div>
                        );
                    }
                    return undefined;
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
                        <div className="spanCalendarExercises">
                            {exerciseDivs}
                        </div>
                    </div>
                );
                day = addDays(day, 1);
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
