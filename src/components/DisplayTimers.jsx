import React, { Component } from 'react';

export default class DisplayTimers extends Component {
    render() {
        return (
            <div className="timerCount">
                <div className="timerText">
                    <h2 className="timerTextLine">
                        {this.props.displayType}&nbsp;-&nbsp;
                        {this.props.remainingRounds}
                    </h2>
                    <h2 className="timerTextLine">
                        {this.props.displayHours}:{this.props.displayMinutes}:
                        {this.props.displaySeconds}
                    </h2>
                </div>
            </div>
        );
    }
}
