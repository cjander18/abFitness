import React, { Component } from 'react';
import { addDays, endOfWeek, startOfWeek } from 'date-fns';
import CalendarDay from './CalendarDay';

export default class CalendarWeek extends Component {
    render() {
        const { selectedDate = new Date() } = this.props;

        let startDate = startOfWeek(selectedDate);
        let endDate = endOfWeek(selectedDate);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const firstDay = i === 0;
                day = addDays(day, 1);
                days.push(
                    <CalendarDay
                        key={day}
                        day={day}
                        selectDate={this.props.selectDate}
                        selectHour={this.props.selectHour}
                        selectedDate={this.props.selectedDate}
                        selectedHour={this.props.selectedHour}
                        firstDay={firstDay}
                        showPopup={this.props.showPopup}
                        togglePopup={this.props.togglePopup}
                    ></CalendarDay>
                );
            }
            rows.push(
                <tr className="row week" key="week">
                    {days}
                </tr>
            );
            days = [];
        }

        return (
            <table className="body week">
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
