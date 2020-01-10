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
    constructor(props) {
        super(props);

        this.state = {
            openNewExercise: false,
            openUpdateExercise: false,
        };
        this.openNewModal = this.openNewModal.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openNewModal(id) {
        this.setState({ openNewExercise: id.toString() });
    }

    openUpdateModal(id) {
        this.setState({ openUpdateModal: id.toString() });
    }

    closeModal() {
        this.setState({ openNewExercise: false });
        this.setState({ openUpdateModal: false });
    }

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
                    <div
                        className="calendarExercises"
                        key={exercise.id}
                        onClick={e => {
                            this.openUpdateModal(exercise.id);
                            e.stopPropagation();
                        }}
                        onMouseDown={e => e.stopPropagation()}
                    >
                        <div>{exercise.exerciseType}</div>
                        <Popup
                            key={exercise.id}
                            open={this.state.openUpdateModal === exercise.id}
                            modal
                            closeOnDocumentClick
                            onClose={this.closeModal}
                        >
                            {close => (
                                <LiftingInput
                                    close={this.closeModal}
                                    exercises={this.props.exercises}
                                    key={exercise.id}
                                    selectedExercise={exercise}
                                    updateExercises={this.props.updateExercises}
                                    userSession={this.props.userSession}
                                ></LiftingInput>
                            )}
                        </Popup>
                    </div>
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
                        key={cloneDay}
                        onClick={() => {
                            this.props.selectDate(cloneDay);
                            this.openNewModal(cloneDay);
                        }}
                    >
                        <div>
                            <span className="number">{formattedDate}</span>
                            <div className="spanCalendarExercises">
                                {exerciseDivs}
                            </div>
                        </div>
                        <Popup
                            key={`${cloneDay}Add`}
                            open={this.state.openNewExercise == cloneDay}
                            modal
                            closeOnDocumentClick
                            onClose={this.closeModal}
                        >
                            {close => (
                                <LiftingInput
                                    exercises={this.props.exercises}
                                    key={`${cloneDay}Btn`}
                                    exerciseDate={cloneDay}
                                    updateExercises={this.props.updateExercises}
                                    userSession={this.props.userSession}
                                ></LiftingInput>
                            )}
                        </Popup>
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
