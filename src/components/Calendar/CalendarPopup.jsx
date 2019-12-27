import React, { Component } from 'react';
import LiftingInput from '../LiftingInput';

export default class CalendarPopup extends Component {
    render() {
        const { closePopup, selectedDate, selectedHour } = this.props;
        return (
            <div className="popup\_inner">
                <h1>
                    {selectedDate.toDateString()} {selectedHour}
                </h1>

                <LiftingInput
                    key={this.props.selectedExercise.id}
                    exercises={this.props.exercises}
                    selectedExercise={this.props.selectedExercise}
                    updateExercises={this.props.updateExercises}
                    userSession={this.props.userSession}
                ></LiftingInput>
                <button onClick={closePopup}>close me</button>
            </div>
        );
    }

    // saveItem() {
    //     const options = { encrypt: false };
    //     this.userSession
    //         .putFile(SUBJECTS_FILENAME, JSON.stringify(subjects), options)
    //         .finally(() => {
    //             if (window.location.search) {
    //                 window.history.pushState(
    //                     null,
    //                     '',
    //                     window.location.href.split('?')[0]
    //                 );
    //             }
    //             resolveSubjects(this, this.userSession, subjects);
    //         });
    // }
}
