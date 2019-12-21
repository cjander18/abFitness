import React, { Component } from 'react';
import LiftingInput from './LiftingInput';
import LiftingCalendar from './Calendar/LiftingCalendar';
import { BlockstackUtils } from '../utils/Blockstack';

export default class Lifting extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
