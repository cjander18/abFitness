import React, { Component } from 'react';
import { BlockstackUtils } from '../utils/Blockstack';
import { Button } from 'shards-react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export default class LiftingInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseDate: new Date(),
            exercises: [],
            exerciseType: '',
            repetitions: 0,
            sets: 0,
            weightLifted: 0,
        };
    }

    async saveExercise() {
        console.log('SAVINGGGGG');
        const exercises = this.props.exercises;
        exercises.push({
            exerciseType: this.state.exerciseType,
            repetitions: this.state.repetitions,
            sets: this.state.sets,
            weightLifted: this.state.weightLifted,
            date: this.state.exerciseDate,
        });
        await BlockstackUtils.setExercises(exercises);
        await this.props.updateExercises(exercises);
    }

    incrementRepetitions = add => {
        this.setState(
            {
                repetitions: add
                    ? (this.state.repetitions || 0) + 1
                    : (this.state.repetitions || 0) - 1,
            },
            () => console.log(`Rep is now: `, this.state.repetitions)
        );
    };

    incrementSets = add => {
        this.setState(
            {
                sets: add
                    ? (this.state.sets || 0) + 1
                    : (this.state.sets || 0) - 1,
            },
            () => console.log(`Set is now: `, this.state.sets)
        );
    };

    incrementWeightLifted = add => {
        this.setState(
            {
                weightLifted: add
                    ? (this.state.weightLifted || 0) + 1
                    : (this.state.weightLifted || 0) - 1,
            },
            () => console.log(`Weight lifted is now: `, this.state.weightLifted)
        );
    };

    render() {
        return (
            <div className="liftingInput">
                <div className="oneLineInputDiv">
                    <span>
                        <label>Exercise:</label>
                        <input
                            id="exerciseType"
                            name="exerciseType"
                            type="dropdown"
                            placeholder="Exercise Type"
                            title="Exercise Type"
                            className="exerciseType"
                            onChange={event =>
                                this.setState({
                                    exerciseType: event.target.value,
                                })
                            }
                        ></input>
                    </span>
                    <span>
                        <label>Date:</label>
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
                            onChange={event =>
                                this.setState({
                                    exerciseDate: utcToZonedTime(
                                        event.target.value,
                                        Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone
                                    ),
                                })
                            }
                        ></input>
                    </span>
                </div>
                <div className="oneLineInputDiv">
                    <span className="exerciseCounter">
                        <label>Sets:</label>
                        <Button
                            type="button"
                            theme="secondary"
                            className="btn-increment"
                            onClick={() => this.incrementSets(false)}
                        >
                            -
                        </Button>
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
                        <Button
                            type="button"
                            theme="secondary"
                            className="btn-increment"
                            onClick={() => this.incrementSets(true)}
                        >
                            +
                        </Button>
                    </span>
                    <span className="exerciseCounter">
                        <label>Reps:</label>
                        <Button
                            type="button"
                            theme="secondary"
                            className="btn-increment"
                            onClick={() => this.incrementRepetitions(false)}
                        >
                            -
                        </Button>
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
                        <Button
                            type="button"
                            theme="secondary"
                            className="btn-increment"
                            onClick={() => this.incrementRepetitions(true)}
                        >
                            +
                        </Button>
                    </span>
                </div>
                <div className="oneLineInputDiv">
                    <label>Weight:</label>
                    <Button
                        type="button"
                        theme="secondary"
                        className="btn-increment"
                        onClick={() => this.incrementWeightLifted(false)}
                    >
                        -
                    </Button>
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
                    <Button
                        type="button"
                        theme="secondary"
                        className="btn-increment"
                        onClick={() => this.incrementWeightLifted(true)}
                    >
                        +
                    </Button>
                </div>
                <div className="inlineButton">
                    <button
                        id="addExercise"
                        type="button"
                        onClick={() => this.saveExercise()}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }

    startTimer() {}
}
