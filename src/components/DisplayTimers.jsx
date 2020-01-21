import React, { Component } from 'react';

export default class DisplayTimers extends Component {
    render() {
        return (
            <div className="timerCount">
                <div className="timerText">
                    <p className="timerTextLine">
                        {this.props.displayType}&nbsp;-&nbsp;
                        {this.props.remainingRounds}
                    </p>
                    <p className="timerTextLine">
                        {this.props.displayHours}:{this.props.displayMinutes}:
                        {this.props.displaySeconds}
                    </p>
                </div>
            </div>
        );
    }
}
