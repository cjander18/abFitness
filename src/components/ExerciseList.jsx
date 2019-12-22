import React, { Component } from 'react';

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);
    }

    buildExerciseList() {
        const { exercises } = this.props;
        const exerciseTypes = [];
        const exerciseDivs = [];
        let count = 0;

        exercises.map(exercise => {
            if (!exerciseTypes.includes(exercise.exerciseType)) {
                exerciseTypes.push(exercise.exerciseType);
                const key = exercise.exerciseType + count;
                exerciseDivs.push(
                    <div className="calendarExercises" key={key}>
                        {exercise.exerciseType}
                    </div>
                );
                count = count + 1;
            }
        });

        return exerciseDivs;
    }

    render() {
        const exerciseList = this.buildExerciseList();
        return <div className="exerciseList">{exerciseList}</div>;
    }

    startTimer() {}
}
