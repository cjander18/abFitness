import React, { Component } from 'react';
import { BlockstackUtils } from '../utils/Blockstack';
import { Button } from 'shards-react';

const blockstack = new BlockstackUtils();

export default class LiftingInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repetitions: undefined,
            sets: undefined,
            weightLifted: undefined,
            exerciseType: '',
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
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

    // componentDidMount() {
    //     this.getSavedTimers();
    // }

    // handleSubmit(event) {
    //     console.log('STARTINGGGGG');
    //     event.preventDefault();
    //     clearInterval(this.intervalHandle);

    //     if (
    //         this.state.breakHours ||
    //         this.state.breakMinutes ||
    //         this.state.breakSeconds
    //     ) {
    //         this.setState({ breaksExist: true });
    //         this.setState({ breakNext: true });
    //     }

    //     this.setState({ displayRounds: this.state.rounds });
    //     this.setState({
    //         displayHours: this.addLeadingZero(this.state.roundHours),
    //     });
    //     this.setState({
    //         displayMinutes: this.addLeadingZero(this.state.roundMinutes),
    //     });
    //     this.setState({
    //         displaySeconds: this.addLeadingZero(this.state.roundSeconds),
    //     });

    //     this.setState({ remainingRounds: this.state.rounds });
    //     this.setState({ remainingHours: this.state.roundHours });
    //     this.setState({ remainingMinutes: this.state.roundMinutes });
    //     this.setState({ remainingSeconds: this.state.roundSeconds });

    //     this.intervalHandle = setInterval(this.tick, 1000);
    // }

    render() {
        return (
            <div className="liftingInput">
                <div className="oneLineInputDiv">
                    <input
                        id="exerciseType"
                        name="exerciseType"
                        type="dropdown"
                        placeholder="Type"
                        title="Exercise Type"
                        className="exerciseType"
                        onChange={event =>
                            this.setState({
                                exerciseType: event.target.value,
                            })
                        }
                    ></input>
                </div>
                <div className="oneLineInputDiv">
                    <span className="exerciseCounter">
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
                                    repetitions: parseInt(event.target.value),
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
                    <span className="exerciseCounter">
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
                                    sets: parseInt(event.target.value),
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
                </div>
                <div className="oneLineInputDiv">
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
                                weightLifted: parseInt(event.target.value),
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
                    <button id="addExercise" type="submit">
                        Add
                    </button>
                </div>
            </div>
        );
    }

    startTimer() {}
}
