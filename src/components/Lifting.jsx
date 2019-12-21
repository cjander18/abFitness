import React, { Component } from 'react';
import LiftingInput from './LiftingInput';
import LiftingCalendar from './Calendar/LiftingCalendar';

export default class Lifting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
        };
    }

    updateExercises = exercises => {
        this.setState({ exercises: exercises }, () =>
            console.log(`exercises: ${this.state.calendarType}`)
        );
    };

    render() {
        return (
            <div className="lifting">
                <div className="oneLineInputDiv">
                    <LiftingInput
                        userSession={this.props.userSession}
                        exercises={this.state.exercises}
                        updateExercises={this.updateExercises}
                    ></LiftingInput>
                    <LiftingCalendar
                        userSession={this.props.userSession}
                        exercises={this.state.exercises}
                        updateExercises={this.updateExercises}
                    ></LiftingCalendar>
                </div>
            </div>
        );
    }
}
