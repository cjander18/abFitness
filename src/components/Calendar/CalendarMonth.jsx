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
import Popup from 'reactjs-popup';
import LiftingInput from '../LiftingInput';

export default class CalendarMonth extends Component {
    buildExerciseDivs(day, exercises) {
        return exercises.map(exercise => {
            if (compareAsc(new Date(exercise.date), day) === 0) {
                const pluralSets = exercise.sets > 1;
                const pluralReps = exercise.repetitions > 1;
                const tooltipText = `${exercise.sets} ${
                    pluralSets ? 'sets' : 'set'
                } of ${exercise.repetitions} ${
                    pluralReps ? 'reps' : 'rep'
                } at ${exercise.weightLifted}lbs`;
                return (
                    <Popup
                        key={exercise.id}
                        trigger={
                            <div
                                className="calendarExercises"
                                key={exercise.id}
                            >
                                {exercise.exerciseType}
                                <span className="tooltip-text">
                                    {tooltipText}
                                </span>
                            </div>
                        }
                        modal
                        closeOnDocumentClick
                    >
                        {close => (
                            <LiftingInput
                                close={close}
                                exercises={this.props.exercises}
                                key={exercise.id}
                                selectedExercise={exercise}
                                updateExercises={this.props.updateExercises}
                                userSession={this.props.userSession}
                            ></LiftingInput>
                        )}
                    </Popup>
                );
            }
            return undefined;
        });
    }

    render() {
        const { selectedDate = new Date(), exercises = [] } = this.props;

        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(selectedDate);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = 'd';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                const exerciseDivs = this.buildExerciseDivs(day, exercises);

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
                        onClick={() => {
                            this.props.selectDate(cloneDay);
                            this.props.togglePopup();
                        }}
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
