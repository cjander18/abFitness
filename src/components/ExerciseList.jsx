import React, { Component } from 'react';
// return 1 if the first date is after the seoncd
import { compareAsc } from 'date-fns';

export default class ExerciseList extends Component {
    buildExerciseList() {
        const {
            dateRange: { startDate, endDate },
            exercises,
        } = this.props;
        const exerciseTypes = [];
        let count = 0;

        const exerciseDivs = exercises.map(exercise => {
            const exerciseDate = new Date(exercise.date);
            // If the exercise date is between (or on) the start and end dates
            // and it is not already in the list
            if (
                compareAsc(exerciseDate, startDate) > -1 &&
                compareAsc(endDate, exerciseDate) > -1 &&
                !exerciseTypes.includes(exercise.exerciseType)
            ) {
                exerciseTypes.push(exercise.exerciseType);
                const key = exercise.exerciseType + count;
                count = count + 1;
                return (
                    <div className="calendarExercises" key={key}>
                        {exercise.exerciseType}
                    </div>
                );
            }
            return undefined;
        });

        return exerciseDivs;
    }

    render() {
        const exerciseList = this.buildExerciseList();
        return <div className="exerciseList">{exerciseList}</div>;
    }

    startTimer() {}
}
