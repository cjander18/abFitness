import React, { Component } from 'react';
import Button from './Form/Button';
import TimeInput from './Form/TimeInput';
import DisplayTimers from './DisplayTimers';
import SavedTimers from './SavedTimers';
import { BlockstackUtils } from '../utils/Blockstack';
import { addLeadingZero } from '../utils/utils';
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

    handleSavedTimerKeyUp(e, timerId) {
        if (e.key === 'Enter') {
            this.selectTimer(timerId);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            this.deleteTimer(e, timerId);
        }
    }

    async clearTimer() {
        this.setState({ selectedTimerId: 0 });
        this.setState({ breakHours: 0 });
        this.setState({ breakMinutes: 0 });
        this.setState({ breakSeconds: 0 });
        this.setState({ roundHours: 0 });
        this.setState({ roundMinutes: 0 });
        this.setState({ roundSeconds: 0 });
        this.setState({ rounds: 0 });
        this.setState({ name: '' });
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

    countDownTime() {
        // Count down the hour
        if (
            this.state.remainingHours > 0 &&
            this.state.remainingMinutes === 0 &&
            this.state.remainingSeconds === 0
        ) {
            this.setState({ remainingHours: this.state.remainingHours - 1 });
            this.setState({
                displayHours: addLeadingZero(this.state.remainingHours),
            });
            this.setState({
                remainingMinutes: 59,
            });
            this.setState({
                displayMinutes: addLeadingZero(this.state.remainingMinutes),
            });
            this.setState({
                remainingSeconds: 59,
            });
            this.setState({
                displaySeconds: addLeadingZero(this.state.remainingSeconds),
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
                displayMinutes: addLeadingZero(this.state.remainingMinutes),
            });
            this.setState({
                remainingSeconds: 59,
            });
            this.setState({
                displaySeconds: addLeadingZero(this.state.remainingSeconds),
            });
            return;
        }

        // Count down the seconds
        this.setState({
            remainingSeconds: this.state.remainingSeconds - 1,
        });
        this.setState({
            displaySeconds: addLeadingZero(this.state.remainingSeconds),
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
            displayHours: addLeadingZero(this.state.roundHours),
        });
        this.setState({
            displayMinutes: addLeadingZero(this.state.roundMinutes),
        });
        this.setState({
            displaySeconds: addLeadingZero(this.state.roundSeconds),
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
                            <div className="labelDiv">
                                <label htmlFor="timerName">Name</label>
                            </div>
                            <input
                                type="text"
                                id="timerName"
                                name="timerName"
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
                            <div className="labelDiv">
                                <label htmlFor="numberOfRounds">Rounds</label>
                            </div>
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
                        <TimeInput
                            hourLabel="Round Duration"
                            hourId="roundHours"
                            hourTitle="Round hour duration"
                            hours={this.state.roundHours}
                            hoursChange={event =>
                                this.setState({
                                    roundHours: parseInt(event.target.value),
                                })
                            }
                            minuteId="roundMinutes"
                            minuteTitle="Round minute duration"
                            minutes={this.state.roundMinutes}
                            minutesChange={event =>
                                this.setState({
                                    roundMinutes: parseInt(event.target.value),
                                })
                            }
                            secondId="roundSeconds"
                            secondTitle="Round second duration"
                            seconds={this.state.roundSeconds}
                            secondsChange={event =>
                                this.setState({
                                    roundSeconds: parseInt(event.target.value),
                                })
                            }
                        />
                        <TimeInput
                            hourLabel="Break Duration"
                            hourId="breakHours"
                            hourTitle="Break hour duration"
                            hours={this.state.breakHours}
                            hoursChange={event =>
                                this.setState({
                                    breakHours: parseInt(event.target.value),
                                })
                            }
                            minuteId="breakMinutes"
                            minuteTitle="Break minute duration"
                            minutes={this.state.breakMinutes}
                            minutesChange={event =>
                                this.setState({
                                    breakMinutes: parseInt(event.target.value),
                                })
                            }
                            secondId="breakSeconds"
                            secondTitle="Break second duration"
                            seconds={this.state.breakSeconds}
                            secondsChange={event =>
                                this.setState({
                                    breakSeconds: parseInt(event.target.value),
                                })
                            }
                        />
                        <div className="oneLineInputDiv">
                            <Button
                                id="saveTimer"
                                type="button"
                                className="btn btn-orange mx-1 timerTimeMiddle"
                                onClick={() => {
                                    this.state.selectedTimerId !== 0
                                        ? this.updateTimer()
                                        : this.saveTimer();
                                }}
                            >
                                {this.state.selectedTimerId !== 0
                                    ? 'Update'
                                    : 'Save'}
                            </Button>
                            <Button
                                id="clearTimer"
                                className="btn btn-blue mx-1 timerTimeMiddle"
                                onClick={() => this.clearTimer()}
                                disabled={this.state.selectedTimerId === 0}
                            >
                                Clear
                            </Button>
                            <div className="inlineButton">
                                <button
                                    id="startTimer"
                                    type="submit"
                                    className="btn btn-orange mx-1 timerTimeMiddle"
                                >
                                    Start
                                </button>
                            </div>
                            <Button
                                id="stopTimer"
                                className="btn btn-blue mx-1 timerTimeMiddle"
                                onClick={() => this.manageTimer()}
                                disabled={!this.state.manageTimerEnabled}
                            >
                                {this.state.manageTimerText}
                            </Button>
                        </div>
                    </form>
                    <DisplayTimers
                        displayType={this.state.displayType}
                        remainingRounds={this.state.remainingRounds}
                        displayHours={this.state.displayHours}
                        displayMinutes={this.state.displayMinutes}
                        displaySeconds={this.state.displaySeconds}
                    />
                </div>
                <SavedTimers
                    onKeyUp={this.handleSavedTimerKeyUp.bind(this)}
                    deleteTimer={this.deleteTimer.bind(this)}
                    selectTimer={this.selectTimer.bind(this)}
                    selectedTimerId={this.state.selectedTimerId}
                    timers={this.state.timers}
                />
            </div>
        );
    }

    startTimer() {}
}
