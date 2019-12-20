import React, { Component } from 'react';

export default class CalendarDay extends Component {
    render() {
        const hours = this.setHourArray();

        return (
            <table className="table hour">
                <tbody
                    onClick={() => this.props.togglePopup(this.props.showPopup)}
                >
                    {hours}
                </tbody>
            </table>
        );
    }

    setPopup = selectedHour => {
        this.setState({
            selectedHour: selectedHour,
        });
        this.props.togglePopup.bind(this);
    };

    setHourArray() {
        const result = [];
        const { day, firstDay } = this.props;
        for (let hour = 1; hour <= 24; hour++) {
            const time = `${hour}:00`;
            const timeHalfHour = `${hour}:30`;
            const timeKey = day.toDateString() + time;
            const timeHalfHourKey = day.toDateString() + timeHalfHour;
            result.push(
                <tr
                    key={timeKey}
                    className="row hour"
                    onClick={() => this.props.selectHour(time)}
                >
                    <td>{firstDay ? time : ''}</td>
                </tr>
            );
            result.push(
                <tr
                    key={timeHalfHourKey}
                    className="row halfhour"
                    onClick={() => this.props.selectHour(timeHalfHour)}
                ></tr>
            );
        }
        return result;
    }
}
