import React, { Component } from 'react';
import { BlockstackUtils } from '../utils/Blockstack';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import uuidv4 from 'uuid/v4';

export default class LiftingInput extends Component {
    constructor(props) {
        super(props);

        let exerciseType = '';
        let repetitions = 0;
        let sets = 0;
        let weightLifted = 0;
        let date = new Date();

        const { selectedExercise } = this.props;
        if (selectedExercise) {
            ({
                exerciseType,
                repetitions,
                sets,
                weightLifted,
                date,
            } = selectedExercise);
            date = new Date(date);
        }

        this.state = {
            exerciseDate: this.props.exerciseDate || date,
            exercises: [],
            exerciseType,
            repetitions,
            sets,
            weightLifted,
        };
    }

    async updateExercise() {
        const { selectedExercise } = this.props;
        const exercises = this.props.exercises.filter(
            exercise => exercise.id !== selectedExercise.id
        );

        this.saveExercise(exercises);
    }

    async deleteExercise() {
        const { selectedExercise } = this.props;
        const exercises = this.props.exercises.filter(
            exercise => exercise.id !== selectedExercise.id
        );

        await BlockstackUtils.setExercises(exercises);
        await this.props.updateExercises(exercises);
    }

    async saveExercise(exercisesArr) {
        const exercises = exercisesArr || this.props.exercises;
        exercises.push({
            id: uuidv4(),
            exerciseType: this.state.exerciseType,
            repetitions: this.state.repetitions,
            sets: this.state.sets,
            weightLifted: this.state.weightLifted,
            date: this.state.exerciseDate,
        });
        await BlockstackUtils.setExercises(exercises);
        await this.props.updateExercises(exercises);
        this.props.close();
    }

    render() {
        return (
            <div className="liftingInput">
                <button className="close" onClick={this.props.close}>
                    &times;
                </button>
                <div className="oneLineInputDiv">
                    <span>
                        <label className="my-0">Exercise:</label>
                        <input
                            id="exerciseType"
                            name="exerciseType"
                            type="dropdown"
                            placeholder="Exercise Type"
                            title="Exercise Type"
                            className="exerciseType"
                            value={this.state.exerciseType}
                            onChange={event =>
                                this.setState({
                                    exerciseType: event.target.value,
                                })
                            }
                        ></input>
                    </span>
                </div>
                <div className="oneLineInputDiv">
                    <span>
                        <label className="my-0">Date:</label>
                        <input
                            id="exerciseDate"
                            name="exerciseDate"
                            type="date"
                            placeholder="Date"
                            title="Exercise Date"
                            className="exerciseDate"
                            value={format(
                                this.state.exerciseDate,
                                'yyyy-MM-dd'
                            )}
                            onChange={event => {
                                if (Date.parse(event.target.value)) {
                                    this.setState({
                                        exerciseDate: utcToZonedTime(
                                            event.target.value,
                                            Intl.DateTimeFormat().resolvedOptions()
                                                .timeZone
                                        ),
                                    });
                                }
                            }}
                        ></input>
                    </span>
                </div>
                <div className="oneLineInputDiv">
                    <span className="exerciseCounter">
                        <label className="my-0">Sets:</label>
                        <input
                            id="sets"
                            name="sets"
                            type="number"
                            placeholder="Sets"
                            title="Sets"
                            className="exerciseNumber"
                            size="4"
                            value={this.state.sets}
                            onChange={event =>
                                this.setState({
                                    sets: event.target.value.replace(/\D/, ''),
                                })
                            }
                        ></input>
                    </span>
                    <span className="exerciseCounter">
                        <label className="my-0">Reps:</label>
                        <input
                            id="repetitions"
                            name="repetitions"
                            type="number"
                            placeholder="Reps"
                            title="Repetitions"
                            className="exerciseNumber"
                            size="6"
                            value={this.state.repetitions}
                            onChange={event =>
                                this.setState({
                                    repetitions: event.target.value.replace(
                                        /\D/,
                                        ''
                                    ),
                                })
                            }
                        ></input>
                    </span>
                </div>
                <div className="oneLineInputDiv">
                    <label className="my-0">Weight:</label>
                    <input
                        id="weightLifted"
                        name="weightLifted"
                        type="number"
                        placeholder="Weight"
                        title="Weight lifted"
                        className="exerciseNumberOneLine"
                        value={this.state.weightLifted}
                        onChange={event =>
                            this.setState({
                                weightLifted: event.target.value.replace(
                                    /\D/,
                                    ''
                                ),
                            })
                        }
                    ></input>
                </div>
                <div className="inlineButton">
                    {this.props.selectedExercise &&
                    this.props.selectedExercise.exerciseType ? (
                        <span>
                            <button
                                id="deleteExercise"
                                name="deleteExercise"
                                className="btn btn-orange mx-1"
                                type="button"
                                onClick={() => this.deleteExercise()}
                            >
                                Delete
                            </button>
                            <button
                                id="updateExercise"
                                name="updateExercise"
                                className="btn btn-blue mx-1"
                                type="button"
                                onClick={() => this.updateExercise()}
                            >
                                Update
                            </button>
                        </span>
                    ) : (
                        <button
                            id="addExercise"
                            name="addExercise"
                            className="btn btn-blue mx-1"
                            type="button"
                            onClick={() => this.saveExercise()}
                        >
                            Add
                        </button>
                    )}
                </div>
            </div>
        );
    }

    startTimer() {}
}
