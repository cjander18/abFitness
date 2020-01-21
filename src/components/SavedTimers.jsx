import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Timer extends Component {
    setText = timer => {
        const roundText = this.setTimeText(
            timer.roundHours,
            timer.roundMinutes,
            timer.roundSeconds
        );
        const breakText =
            timer.breakHours > 0 ||
            timer.breakMinutes > 0 ||
            timer.breakSeconds > 0
                ? this.setTimeText(
                      timer.breakHours,
                      timer.breakMinutes,
                      timer.breakSeconds
                  )
                : '';
        const pluralRounds = timer.rounds > 1 ? 'rounds' : 'round';
        const pluralBreaks = timer.rounds > 1 ? 'breaks' : 'a break';
        const inBetween = timer.rounds > 1 ? ' in between' : '';
        return (
            <span className="selectTimer">
                <span>
                    {`${timer.name}: ${timer.rounds} ${pluralRounds} of `}
                    {roundText}
                </span>
                <span>
                    {timer.breakHours > 0 ||
                    timer.breakMinutes > 0 ||
                    timer.breakSeconds > 0 ? (
                        <span>
                            {' '}
                            with {pluralBreaks} of {breakText}
                            {inBetween}
                        </span>
                    ) : (
                        ''
                    )}
                </span>
            </span>
        );
    };

    setTimeText = (hours = 0, minutes = 0, seconds = 0) => {
        let result = '';
        let timeText = '';
        if (hours > 0) {
            result += `${hours}H`;
            timeText += `${hours}h `;
        }
        if (minutes > 0) {
            result += `${minutes}M`;
            timeText += `${minutes}m `;
        }
        if (seconds > 0) {
            result += `${seconds}S`;
            timeText += `${seconds}s `;
        }

        return <time dateTime={`PT${result}`}>{timeText}</time>;
    };

    render() {
        return (
            <div className="savedTimers">
                {this.props.timers.map(timer => (
                    <div
                        id="savedTimer"
                        className={
                            this.props.selectedTimerId === timer.id
                                ? 'savedTimerSelected'
                                : 'savedTimer'
                        }
                        key={timer.id}
                        onClick={() => this.props.selectTimer(timer.id)}
                        tabIndex="0"
                        onKeyUp={e => this.props.onKeyUp(e, timer.id)}
                    >
                        <div>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={e =>
                                    this.props.deleteTimer(e, timer.id)
                                }
                                className="deleteTimer"
                            />
                            &nbsp;&nbsp;{this.setText(timer)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
