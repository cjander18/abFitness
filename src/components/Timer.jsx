import React, { Component } from 'react';
import { BlockstackUtils } from '../utils/Blockstack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import uuidv4 from 'uuid/v4';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breaksExist: false,
            breakNext: false,
            breakHours: 0,
            breakMinutes: 0,
            breakSeconds: 0,
            displayType: 'Round',
            displayRound: '0',
            displayHours: '00',
            displayMinutes: '00',
            displaySeconds: '00',
            manageTimerText: 'Stop',
            manageTimerEnabled: false,
            remainingRounds: 0,
            remainingHours: 0,
            remainingMinutes: 0,
            remainingSeconds: 0,
            rounds: 0,
            roundHours: 0,
            roundMinutes: 0,
            roundSeconds: 0,
            name: '',
            timers: [],
            selectedTimerId: 0,
        };
        this.handleSubmit = this.handleSubmit.bind(this);

        this.intervalHandle = {};
        this.tick = this.tick.bind(this);
    }

    async saveTimer() {
        const timers = this.state.timers;
        timers.push({
            id: uuidv4(),
            breakHours: this.state.breakHours,
            breakMinutes: this.state.breakMinutes,
            breakSeconds: this.state.breakSeconds,
            roundHours: this.state.roundHours,
            roundMinutes: this.state.roundMinutes,
            roundSeconds: this.state.roundSeconds,
            rounds: this.state.rounds,
            name: this.state.name,
        });
        await BlockstackUtils.setTimers(timers);
        await this.getSavedTimers();
    }

    async updateTimer() {
        const timers = this.state.timers.map(timer =>
            timer.id === this.state.selectedTimerId
                ? {
                      ...timer,
                      breakHours: this.state.breakHours,
                      breakMinutes: this.state.breakMinutes,
                      breakSeconds: this.state.breakSeconds,
                      roundHours: this.state.roundHours,
                      roundMinutes: this.state.roundMinutes,
                      roundSeconds: this.state.roundSeconds,
                      rounds: this.state.rounds,
                      name: this.state.name,
                  }
                : timer
        );
        await BlockstackUtils.setTimers(timers);
        await this.getSavedTimers();
    }

    async selectTimer(id) {
        const timer = this.state.timers.filter(timer => timer.id === id)[0];
        this.setState({ selectedTimerId: id });
        this.setState({ breakHours: timer.breakHours });
        this.setState({ breakMinutes: timer.breakMinutes });
        this.setState({ breakSeconds: timer.breakSeconds });
        this.setState({ roundHours: timer.roundHours });
        this.setState({ roundMinutes: timer.roundMinutes });
        this.setState({ roundSeconds: timer.roundSeconds });
        this.setState({ rounds: timer.rounds });
        this.setState({ name: timer.name });
    }

    async deleteTimer(event, id) {
        event.stopPropagation();
        const timers = this.state.timers.filter(timer => timer.id !== id);
        await BlockstackUtils.setTimers(timers);
        await this.getSavedTimers();
    }

    componentDidMount() {
        this.getSavedTimers();
    }

    async getSavedTimers() {
        await BlockstackUtils.getTimers().then(timers => {
            console.log(timers);
            this.setState({ timers }, () =>
                console.log(`TIMER: `, this.state.timers)
            );
        });
    }

    addLeadingZero(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number.toString();
        }
    }

    countDownTime() {
        // Count down the hour
        if (
            this.state.remainingHours > 0 &&
            this.state.remainingMinutes === 0 &&
            this.state.remainingSeconds === 0
        ) {
            this.setState({ remainingHours: this.state.remainingHours - 1 });
            this.setState({
                displayHours: this.addLeadingZero(this.state.remainingHours),
            });
            this.setState({
                remainingMinutes: 59,
            });
            this.setState({
                displayMinutes: this.addLeadingZero(
                    this.state.remainingMinutes
                ),
            });
            this.setState({
                remainingSeconds: 59,
            });
            this.setState({
                displaySeconds: this.addLeadingZero(
                    this.state.remainingSeconds
                ),
            });
            return;
        }

        // Count down the minutes
        if (
            this.state.remainingMinutes > 0 &&
            this.state.remainingSeconds === 0
        ) {
            this.setState({
                remainingMinutes: this.state.remainingMinutes - 1,
            });
            this.setState({
                displayMinutes: this.addLeadingZero(
                    this.state.remainingMinutes
                ),
            });
            this.setState({
                remainingSeconds: 59,
            });
            this.setState({
                displaySeconds: this.addLeadingZero(
                    this.state.remainingSeconds
                ),
            });
            return;
        }

        // Count down the seconds
        this.setState({
            remainingSeconds: this.state.remainingSeconds - 1,
        });
        this.setState({
            displaySeconds: this.addLeadingZero(this.state.remainingSeconds),
        });
    }

    startBreak() {
        this.setState({ breakNext: false });
        this.setState({ displayType: 'Break' });
        this.setState({ remainingHours: this.state.breakHours });
        this.setState({ remainingMinutes: this.state.breakMinutes });
        this.setState({ remainingSeconds: this.state.breakSeconds });
        this.countDownTime();
    }

    setRounds() {
        this.setState({
            remainingRounds: this.state.remainingRounds - 1,
        });
        this.setState({
            displayRound: this.state.remainingRounds,
        });
    }

    tick() {
        if (
            this.state.remainingRounds === 0 &&
            this.state.remainingHours === 0 &&
            this.state.remainingMinutes === 0 &&
            this.state.remainingSeconds === 0
        ) {
            clearInterval(this.intervalHandle);
            this.setState({ manageTimerEnabled: false });
            return;
        }

        // Round it out
        if (
            this.state.remainingHours > 0 ||
            this.state.remainingMinutes > 0 ||
            this.state.remainingSeconds > 0
        ) {
            this.countDownTime();
            return;
        } else if (this.state.remainingRounds > 1) {
            // Break it out
            if (this.state.breaksExist && this.state.breakNext) {
                this.startBreak();
                return;
            } else {
                // Round count
                this.setState({ displayType: 'Round' });
                this.setRounds();
                this.setState({ remainingHours: this.state.roundHours });
                this.setState({ remainingMinutes: this.state.roundMinutes });
                this.setState({ remainingSeconds: this.state.roundSeconds });

                this.countDownTime();
                this.setState({ breakNext: true });
                return;
            }
        }

        // Round count
        this.setRounds();
    }

    handleSubmit(event) {
        event.preventDefault();
        clearInterval(this.intervalHandle);
        this.setState({ manageTimerEnabled: true });

        if (
            this.state.breakHours ||
            this.state.breakMinutes ||
            this.state.breakSeconds
        ) {
            this.setState({ breaksExist: true });
            this.setState({ breakNext: true });
        }

        this.setState({ displayRounds: this.state.rounds });
        this.setState({
            displayHours: this.addLeadingZero(this.state.roundHours),
        });
        this.setState({
            displayMinutes: this.addLeadingZero(this.state.roundMinutes),
        });
        this.setState({
            displaySeconds: this.addLeadingZero(this.state.roundSeconds),
        });

        this.setState({ remainingRounds: this.state.rounds });
        this.setState({ remainingHours: this.state.roundHours });
        this.setState({ remainingMinutes: this.state.roundMinutes });
        this.setState({ remainingSeconds: this.state.roundSeconds });

        this.intervalHandle = setInterval(this.tick, 1000);
    }

    async manageTimer() {
        if (this.state.manageTimerText === 'Stop') {
            this.stopTimer();
            this.setState({ manageTimerText: 'Resume' });
        } else {
            this.resumeTimer();
            this.setState({ manageTimerText: 'Stop' });
        }
    }

    async resumeTimer() {
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    async stopTimer() {
        clearInterval(this.intervalHandle);
    }

    render() {
        return (
            <div className="timer">
                <div className="startTimer">
                    <form
                        className="startTimerForm"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="oneLineInputDiv">
                            <label>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Timer name"
                                className="name"
                                title="Timer name"
                                value={this.state.name}
                                onChange={event =>
                                    this.setState({
                                        name: event.target.value,
                                    })
                                }
                                required
                            ></input>
                        </div>
                        <div className="oneLineInputDiv">
                            <label>Rounds</label>
                            <input
                                type="number"
                                id="numberOfRounds"
                                name="numberOfRounds"
                                placeholder="# of rounds"
                                className="numberOfRounds"
                                title="Number of rounds"
                                size="3"
                                value={this.state.rounds}
                                onChange={event =>
                                    this.setState({
                                        rounds: parseInt(event.target.value),
                                    })
                                }
                            ></input>
                        </div>
                        <div className="oneLineInputDiv">
                            <label>Round Duration</label>
                            <input
                                id="roundHours"
                                name="roundHours"
                                type="number"
                                placeholder="h"
                                title="Round hour duration"
                                className="timerTimeSet timerTimeStart"
                                size="2"
                                value={this.state.roundHours}
                                onChange={event =>
                                    this.setState({
                                        roundHours: parseInt(
                                            event.target.value
                                        ),
                                    })
                                }
                            ></input>
                            :
                            <input
                                id="roundMinutes"
                                name="roundMinutes"
                                type="number"
                                placeholder="m"
                                title="Round minute duration"
                                className="timerTimeSet timerTimeMiddle"
                                size="2"
                                value={this.state.roundMinutes}
                                onChange={event =>
                                    this.setState({
                                        roundMinutes: parseInt(
                                            event.target.value
                                        ),
                                    })
                                }
                            ></input>
                            :
                            <input
                                id="roundSeconds"
                                name="roundSeconds"
                                type="number"
                                placeholder="s"
                                title="Round second duration"
                                className="timerTimeSet timerTimeEnd"
                                size="2"
                                value={this.state.roundSeconds}
                                onChange={event =>
                                    this.setState({
                                        roundSeconds: parseInt(
                                            event.target.value
                                        ),
                                    })
                                }
                            ></input>
                        </div>
                        <div className="oneLineInputDiv">
                            <label>Break Duration</label>
                            <input
                                id="breakHours"
                                name="breakHours"
                                type="number"
                                placeholder="h"
                                title="Break hour duration"
                                className="timerTimeSet timerTimeStart"
                                size="2"
                                value={this.state.breakHours}
                                onChange={event =>
                                    this.setState({
                                        breakHours: parseInt(
                                            event.target.value
                                        ),
                                    })
                                }
                            ></input>
                            :
                            <input
                                id="breakMinutes"
                                name="breakMinutes"
                                type="number"
                                placeholder="m"
                                title="Break minute duration"
                                className="timerTimeSet timerTimeMiddle"
                                size="2"
                                value={this.state.breakMinutes}
                                onChange={event =>
                                    this.setState({
                                        breakMinutes: parseInt(
                                            event.target.value
                                        ),
                                    })
                                }
                            ></input>
                            :
                            <input
                                id="breakSeconds"
                                name="breakSeconds"
                                type="number"
                                placeholder="s"
                                title="Break second duration"
                                className="timerTimeSet timerTimeEnd"
                                size="2"
                                value={this.state.breakSeconds}
                                onChange={event =>
                                    this.setState({
                                        breakSeconds: parseInt(
                                            event.target.value
                                        ),
                                    })
                                }
                            ></input>
                        </div>
                        <div className="oneLineInputDiv">
                            <div className="inlineButton">
                                <button
                                    id="saveTimer"
                                    type="button"
                                    className="btn btn-orange mx-1 timerTimeMiddle"
                                    onClick={() => this.saveTimer()}
                                >
                                    Save
                                </button>
                            </div>
                            <div className="inlineButton">
                                <button
                                    id="updateTimer"
                                    type="button"
                                    className="btn btn-blue mx-1 timerTimeMiddle"
                                    onClick={() => this.updateTimer()}
                                    disabled={this.state.selectedTimerId === 0}
                                >
                                    Update
                                </button>
                            </div>
                            <div className="inlineButton">
                                <button
                                    id="startTimer"
                                    type="submit"
                                    className="btn btn-orange mx-1 timerTimeMiddle"
                                >
                                    Start
                                </button>
                            </div>
                            <div className="inlineButton">
                                <button
                                    id="stopTimer"
                                    type="button"
                                    className="btn btn-blue mx-1 timerTimeMiddle"
                                    onClick={() => this.manageTimer()}
                                    disabled={!this.state.manageTimerEnabled}
                                >
                                    {this.state.manageTimerText}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="timerCount">
                        <div className="timerText">
                            <p className="timerTextLine">
                                {this.state.displayType}&nbsp;-&nbsp;
                                {this.state.remainingRounds}
                            </p>
                            <p className="timerTextLine">
                                {this.state.displayHours}:
                                {this.state.displayMinutes}:
                                {this.state.displaySeconds}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="savedTimers">
                    {this.state.timers.map(timer => (
                        <div
                            id="savedTimer"
                            className={
                                this.state.selectedTimerId === timer.id
                                    ? 'savedTimerSelected'
                                    : 'savedTimer'
                            }
                            key={timer.id}
                            onClick={() => this.selectTimer(timer.id)}
                        >
                            <div>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    onClick={e => this.deleteTimer(e, timer.id)}
                                    className="deleteTimer"
                                />
                                &nbsp;&nbsp;
                                <span className="selectTimer">
                                    {timer.name}: {timer.rounds} round(s) of{' '}
                                    {timer.roundHours}:{timer.roundMinutes}:
                                    {timer.roundSeconds}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    startTimer() {}
}
