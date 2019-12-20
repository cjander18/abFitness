import React, { Component } from 'react';
import LiftingInput from './LiftingInput';
import LiftingCalendar from './Calendar/LiftingCalendar';

export default class Lifting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repetitions: undefined,
            sets: undefined,
            weightLifted: undefined,
            exerciseType: '',
        };
    }

    render() {
        return (
            <div className="lifting">
                <div className="oneLineInputDiv">
                    <LiftingInput
                        userSession={this.props.userSession}
                    ></LiftingInput>
                    <LiftingCalendar
                        userSession={this.props.userSession}
                    ></LiftingCalendar>
                </div>
            </div>
        );
    }
}
